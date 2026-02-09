// app/api/export-vendas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SaleItem {
  bookTitle: string;
  quantity: number;
  price: number;
}

interface Sale {
  id: number;
  date: string;
  items: SaleItem[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer: string;
  category: string;
}

interface Stats {
  totalRevenue: number;
  completedSales: number;
  averageTicket: number;
  totalItems: number;
}

interface Filters {
  category: string;
  startDate: string;
  endDate: string;
  quickFilter: string;
}

export async function POST(request: NextRequest) {
  try {
    const { sales, stats, filters }: { sales: Sale[], stats: Stats, filters: Filters } = await request.json();

    // Criar PDF usando jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Configurar cores (PADRONIZADAS COM O RECIBO)
    const primaryColor = [60, 173, 140]; // #3CAD8C
    const secondaryColor = [102, 102, 102];
    const lightGray = [248, 249, 250];
    const darkGray = [26, 26, 26];

    let yPosition = 20;

    // ========== CABEÇALHO ==========
    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Vendas', 105, yPosition, { align: 'center' });
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Entre Capítulos - Sistema de Gestão de Livraria', 105, yPosition, { align: 'center' });

    yPosition += 5;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Gerado em: ${dateStr}`, 105, yPosition, { align: 'center' });

    yPosition += 8;
    // Linha divisória
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    yPosition += 10;

    // ========== FILTROS APLICADOS ==========
    if (filters.category !== 'Todas' || filters.startDate || filters.endDate) {
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('Filtros Aplicados', 20, yPosition);
      
      yPosition += 7;
      
      // Box de filtros
      const filterBoxHeight = (filters.category !== 'Todas' ? 7 : 0) + 
                             (filters.startDate ? 7 : 0) + 
                             (filters.endDate ? 7 : 0) + 7;
      
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setDrawColor(224, 224, 224);
      doc.roundedRect(20, yPosition, 170, filterBoxHeight, 2, 2, 'FD');

      yPosition += 7;
      doc.setFontSize(10);
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.setFont('helvetica', 'normal');

      if (filters.category !== 'Todas') {
        doc.setFont('helvetica', 'bold');
        doc.text('Categoria:', 25, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(filters.category, 50, yPosition);
        yPosition += 7;
      }
      if (filters.startDate) {
        const startDate = new Date(filters.startDate).toLocaleDateString('pt-BR');
        doc.setFont('helvetica', 'bold');
        doc.text('Data inicial:', 25, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(startDate, 50, yPosition);
        yPosition += 7;
      }
      if (filters.endDate) {
        const endDate = new Date(filters.endDate).toLocaleDateString('pt-BR');
        doc.setFont('helvetica', 'bold');
        doc.text('Data final:', 25, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(endDate, 50, yPosition);
        yPosition += 7;
      }

      yPosition += 5;
    }

    // ========== RESUMO EXECUTIVO ==========
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Executivo', 20, yPosition);
    
    yPosition += 7;

    // Tabela de estatísticas
    const statsTableData = [
      ['Receita Total', `R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
      ['Vendas Concluídas', `${stats.completedSales}`],
      ['Ticket Médio', `R$ ${stats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
      ['Total de Livros Vendidos', `${stats.totalItems}`]
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [['Métrica', 'Valor']],
      body: statsTableData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' }
      },
      margin: { left: 20, right: 20 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // ========== DETALHAMENTO DE VENDAS ==========
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalhamento de Vendas', 20, yPosition);

    yPosition += 7;

    const statusMap: Record<string, string> = {
      'completed': 'Concluída',
      'pending': 'Pendente',
      'cancelled': 'Cancelada'
    };

    // Dados das vendas para a tabela
    const salesTableData = sales.map(sale => {
      const dateObj = new Date(sale.date);
      const formattedDate = dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const itemsText = sale.items.map(item => 
        `${item.bookTitle} (${item.quantity}x)`
      ).join('\n');

      return [
        `#${sale.id}`,
        `${formattedDate}\n${formattedTime}`,
        sale.customer,
        sale.category,
        itemsText,
        `R$ ${sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        statusMap[sale.status] || sale.status
      ];
    });

    autoTable(doc, {
      startY: yPosition,
      head: [['ID', 'Data/Hora', 'Cliente', 'Categoria', 'Itens', 'Total', 'Status']],
      body: salesTableData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { cellWidth: 13 },
        1: { cellWidth: 22 },
        2: { cellWidth: 30 },
        3: { cellWidth: 22 },
        4: { cellWidth: 50 },
        5: { cellWidth: 20, halign: 'right' },
        6: { cellWidth: 13 }
      },
      margin: { left: 20, right: 20 }
    });

    // ========== RODAPÉ ==========
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      const footerY = 280;
      
      // Linha divisória
      doc.setDrawColor(224, 224, 224);
      doc.setLineWidth(0.3);
      doc.line(20, footerY, 190, footerY);

      doc.setFontSize(8);
      doc.setTextColor(153, 153, 153);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Relatório gerado automaticamente pelo Sistema de Gestão de Livraria',
        105,
        footerY + 5,
        { align: 'center' }
      );
      doc.text(
        '© 2026 Entre Capítulos - Todos os direitos reservados',
        105,
        footerY + 10,
        { align: 'center' }
      );
      
      doc.setFontSize(7);
      doc.text(
        `Página ${i} de ${pageCount}`,
        105,
        footerY + 16,
        { align: 'center' }
      );
    }

    // Gerar PDF como ArrayBuffer
    const pdfArrayBuffer = doc.output('arraybuffer');
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="relatorio-vendas-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json({ 
      error: 'Erro ao gerar PDF',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}