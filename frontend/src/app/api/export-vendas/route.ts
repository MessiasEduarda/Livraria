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

    // Configurar cores
    const primaryColor = [11, 66, 0]; // #0b4200
    const secondaryColor = [102, 102, 102]; // #666666
    const lightGray = [248, 249, 250]; // #f8f9fa

    let yPosition = 20;

    // Cabeçalho
    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Vendas', 105, yPosition, { align: 'center' });
    
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Entre Capítulos - Sistema de Gestão', 105, yPosition, { align: 'center' });

    yPosition += 7;
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.setFontSize(10);
    doc.text(`Gerado em: ${dateStr}`, 105, yPosition, { align: 'center' });

    yPosition += 15;

    // Filtros aplicados
    if (filters.category !== 'Todas' || filters.startDate || filters.endDate) {
      doc.setFontSize(14);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('Filtros Aplicados', 20, yPosition);
      
      yPosition += 7;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');

      if (filters.category !== 'Todas') {
        doc.text(`• Categoria: ${filters.category}`, 25, yPosition);
        yPosition += 5;
      }
      if (filters.startDate) {
        const startDate = new Date(filters.startDate).toLocaleDateString('pt-BR');
        doc.text(`• Data inicial: ${startDate}`, 25, yPosition);
        yPosition += 5;
      }
      if (filters.endDate) {
        const endDate = new Date(filters.endDate).toLocaleDateString('pt-BR');
        doc.text(`• Data final: ${endDate}`, 25, yPosition);
        yPosition += 5;
      }

      yPosition += 5;
    }

    // Resumo Executivo
    doc.setFontSize(14);
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
        fontSize: 11,
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

    // Detalhamento de Vendas
    doc.setFontSize(14);
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

    // Largura total disponível: 210mm (A4) - 40mm (margens) = 170mm
    const totalWidth = 170;

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
        0: { cellWidth: 13 },      // ID: ~7.6%
        1: { cellWidth: 22 },      // Data/Hora: ~13%
        2: { cellWidth: 30 },      // Cliente: ~17.6%
        3: { cellWidth: 22 },      // Categoria: ~13%
        4: { cellWidth: 50 },      // Itens: ~29.4%
        5: { cellWidth: 20, halign: 'right' },  // Total: ~11.8%
        6: { cellWidth: 13 }       // Status: ~7.6%
      },
      margin: { left: 20, right: 20 }
    });

    // Rodapé
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(153, 153, 153);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Relatório gerado automaticamente pelo Sistema de Gestão de Livraria',
        105,
        280,
        { align: 'center' }
      );
      doc.text(
        '© 2026 Entre Capítulos - Todos os direitos reservados',
        105,
        285,
        { align: 'center' }
      );
      doc.text(
        `Página ${i} de ${pageCount}`,
        105,
        290,
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