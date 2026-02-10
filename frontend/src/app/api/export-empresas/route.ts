// app/api/export-empresas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface EmpresaItem {
  id: number;
  nome: string;
  email: string;
  cnpj?: string;
  ativo: boolean;
  formasPagamento: string[];
  totalUsuarios?: number;
}

const DEFAULT_STORE = {
  storeName: 'Entre Capítulos',
  storeEmail: 'contato@entrecapitulos.com.br',
  storePhone: '(11) 3456-7890',
  storeAddress: 'Rua dos Livros, 123 - São Paulo, SP',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { empresas, storeConfig } = body as { empresas: EmpresaItem[]; storeConfig?: typeof DEFAULT_STORE };
    const store = storeConfig && typeof storeConfig === 'object' ? { ...DEFAULT_STORE, ...storeConfig } : DEFAULT_STORE;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const primaryColor: [number, number, number] = [60, 173, 140];
    const secondaryColor: [number, number, number] = [102, 102, 102];
    const lightGray: [number, number, number] = [248, 249, 250];
    const darkGray: [number, number, number] = [26, 26, 26];

    let yPosition = 20;

    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Empresas', 148, yPosition, { align: 'center' });

    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(`${store.storeName} - Painel do Sistema (Super Admin)`, 148, yPosition, { align: 'center' });

    yPosition += 5;
    const dateStr = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    doc.text(`Gerado em: ${dateStr}`, 148, yPosition, { align: 'center' });

    yPosition += 8;
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 277, yPosition);

    yPosition += 10;

    const tableData = (empresas || []).map((e) => [
      e.nome || '',
      e.email || '',
      e.cnpj || '—',
      e.ativo ? 'Ativo' : 'Inativo',
      (e.formasPagamento || []).join(', ') || '—',
      String(e.totalUsuarios ?? 0),
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Nome', 'E-mail', 'CNPJ', 'Status', 'Formas de pagamento', 'Usuários']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'left',
      },
      bodyStyles: {
        fontSize: 8,
      },
      alternateRowStyles: {
        fillColor: lightGray,
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 55 },
        2: { cellWidth: 35 },
        3: { cellWidth: 22 },
        4: { cellWidth: 75 },
        5: { cellWidth: 20, halign: 'center' },
      },
      margin: { left: 20, right: 20 },
    });

    const pageCount = (doc as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const footerY = 195;
      doc.setDrawColor(224, 224, 224);
      doc.setLineWidth(0.3);
      doc.line(20, footerY, 277, footerY);
      doc.setFontSize(8);
      doc.setTextColor(153, 153, 153);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Relatório gerado automaticamente pelo Sistema de Gestão de Livraria',
        148,
        footerY + 5,
        { align: 'center' }
      );
      doc.text(
        `© ${new Date().getFullYear()} ${store.storeName} - Todos os direitos reservados`,
        148,
        footerY + 10,
        { align: 'center' }
      );
      doc.setFontSize(7);
      doc.text(`Página ${i} de ${pageCount}`, 148, footerY + 16, { align: 'center' });
    }

    const pdfArrayBuffer = doc.output('arraybuffer');
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="relatorio-empresas-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar PDF', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
