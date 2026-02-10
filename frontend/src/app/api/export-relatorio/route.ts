import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';

interface ReportData {
  reportType: string;
  startDate: string;
  endDate: string;
  category: string;
  stats: {
    totalRevenue: number;
    totalSales: number;
    averageTicket: number;
    totalProducts: number;
  };
  salesData: Array<{
    date: string;
    product: string;
    category: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

const DEFAULT_STORE = {
  storeName: 'Entre Capítulos',
  storeEmail: 'contato@entrecapitulos.com.br',
  storePhone: '(11) 3456-7890',
  storeAddress: 'Rua dos Livros, 123 - São Paulo, SP',
};

// Função para calcular estatísticas reais dos dados
function calculateStats(salesData: ReportData['salesData']) {
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.total, 0);
  const totalSales = salesData.length;
  const totalProducts = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
  const averageTicket = totalSales > 0 ? totalRevenue / totalSales : 0;

  return {
    totalRevenue,
    totalSales,
    averageTicket,
    totalProducts
  };
}

// Função para gerar PDF
async function generatePDF(data: ReportData, store: typeof DEFAULT_STORE) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Calcular estatísticas reais dos dados
  const stats = calculateStats(data.salesData);

  // Cores padronizadas com o recibo
  const primaryColor: [number, number, number] = [60, 173, 140]; // #3CAD8C
  const secondaryColor: [number, number, number] = [102, 102, 102];
  const lightGray: [number, number, number] = [248, 249, 250];
  const darkGray: [number, number, number] = [26, 26, 26];

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
  doc.text(`${store.storeName} - Sistema de Gestão de Livraria`, 105, yPosition, { align: 'center' });

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

  // ========== INFORMAÇÕES DO RELATÓRIO ==========
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Informações do Relatório', 20, yPosition);
  
  yPosition += 7;

  // Box de informações
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setDrawColor(224, 224, 224);
  doc.roundedRect(20, yPosition, 170, 28, 2, 2, 'FD');

  yPosition += 7;
  doc.setFontSize(10);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Tipo:', 25, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  doc.text(data.reportType, 45, yPosition);

  yPosition += 7;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Período:', 25, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  doc.text(`${new Date(data.startDate).toLocaleDateString('pt-BR')} - ${new Date(data.endDate).toLocaleDateString('pt-BR')}`, 45, yPosition);

  yPosition += 7;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Categoria:', 25, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 51, 51);
  doc.text(data.category, 45, yPosition);

  yPosition += 15;

  // ========== RESUMO EXECUTIVO ==========
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo Executivo', 20, yPosition);
  
  yPosition += 7;

  const statsTableData = [
    ['Receita Total', `R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['Total de Vendas', `${stats.totalSales}`],
    ['Ticket Médio', `R$ ${stats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
    ['Produtos Vendidos', `${stats.totalProducts}`]
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

  const salesTableData = data.salesData.map(sale => [
    new Date(sale.date).toLocaleDateString('pt-BR'),
    sale.product,
    sale.category,
    `${sale.quantity}`,
    `R$ ${sale.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `R$ ${sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Data', 'Produto', 'Categoria', 'Qtd', 'Valor Unit.', 'Total']],
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
      0: { cellWidth: 25 },
      1: { cellWidth: 60 },
      2: { cellWidth: 30 },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 20, halign: 'right' },
      5: { cellWidth: 20, halign: 'right' }
    },
    margin: { left: 20, right: 20 }
  });

  // ========== RODAPÉ ==========
  const pageCount = (doc as any).getNumberOfPages();
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
      `© ${new Date().getFullYear()} ${store.storeName} - Todos os direitos reservados`,
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

  return doc.output('arraybuffer');
}

// Função para gerar Excel
async function generateExcel(data: ReportData, store: typeof DEFAULT_STORE) {
  const workbook = new ExcelJS.Workbook();
  
  // Calcular estatísticas reais dos dados
  const stats = calculateStats(data.salesData);
  
  // Propriedades do workbook
  workbook.creator = store.storeName;
  workbook.created = new Date();
  
  // Sheet 1: Resumo
  const summarySheet = workbook.addWorksheet('Resumo', {
    properties: { tabColor: { argb: 'FF3CAD8C' } }
  });

  // Título
  summarySheet.mergeCells('A1:F1');
  const titleCell = summarySheet.getCell('A1');
  titleCell.value = 'RELATÓRIO DE VENDAS';
  titleCell.font = { size: 18, bold: true, color: { argb: 'FF3CAD8C' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  summarySheet.getRow(1).height = 30;

  // Subtítulo
  summarySheet.mergeCells('A2:F2');
  const subtitleCell = summarySheet.getCell('A2');
  subtitleCell.value = `${store.storeName} - Sistema de Gestão de Livraria`;
  subtitleCell.font = { size: 12, italic: true };
  subtitleCell.alignment = { horizontal: 'center' };

  // Data de geração
  summarySheet.mergeCells('A3:F3');
  const dateCell = summarySheet.getCell('A3');
  dateCell.value = `Gerado em: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`;
  dateCell.font = { size: 10 };
  dateCell.alignment = { horizontal: 'center' };

  summarySheet.addRow([]);

  // Informações do Relatório
  summarySheet.addRow(['INFORMAÇÕES DO RELATÓRIO']).font = { bold: true, size: 12, color: { argb: 'FF3CAD8C' } };
  summarySheet.addRow(['Tipo:', data.reportType]);
  summarySheet.addRow(['Período:', `${new Date(data.startDate).toLocaleDateString('pt-BR')} - ${new Date(data.endDate).toLocaleDateString('pt-BR')}`]);
  summarySheet.addRow(['Categoria:', data.category]);
  
  summarySheet.addRow([]);

  // Resumo Executivo
  summarySheet.addRow(['RESUMO EXECUTIVO']).font = { bold: true, size: 12, color: { argb: 'FF3CAD8C' } };
  
  const statsHeader = summarySheet.addRow(['Métrica', 'Valor']);
  statsHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  statsHeader.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF3CAD8C' }
  };
  statsHeader.alignment = { horizontal: 'center', vertical: 'middle' };

  summarySheet.addRow(['Receita Total', `R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
  summarySheet.addRow(['Total de Vendas', stats.totalSales]);
  summarySheet.addRow(['Ticket Médio', `R$ ${stats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
  summarySheet.addRow(['Produtos Vendidos', stats.totalProducts]);

  // Ajustar largura das colunas
  summarySheet.getColumn(1).width = 25;
  summarySheet.getColumn(2).width = 30;

  // Adicionar bordas ao resumo executivo
  summarySheet.eachRow((row, rowNumber) => {
    if (rowNumber >= 11 && rowNumber <= 14) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    }
  });

  // Sheet 2: Detalhamento
  const detailSheet = workbook.addWorksheet('Detalhamento', {
    properties: { tabColor: { argb: 'FF3CAD8C' } }
  });

  // Cabeçalho
  const headerRow = detailSheet.addRow(['Data', 'Produto', 'Categoria', 'Quantidade', 'Valor Unitário', 'Valor Total']);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF3CAD8C' }
  };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.height = 25;

  // Dados
  data.salesData.forEach(sale => {
    detailSheet.addRow([
      new Date(sale.date).toLocaleDateString('pt-BR'),
      sale.product,
      sale.category,
      sale.quantity,
      sale.unitPrice,
      sale.total
    ]);
  });

  // Formatação de números
  detailSheet.getColumn(5).numFmt = 'R$ #,##0.00';
  detailSheet.getColumn(6).numFmt = 'R$ #,##0.00';

  // Ajustar largura das colunas
  detailSheet.getColumn(1).width = 15;
  detailSheet.getColumn(2).width = 40;
  detailSheet.getColumn(3).width = 20;
  detailSheet.getColumn(4).width = 12;
  detailSheet.getColumn(5).width = 18;
  detailSheet.getColumn(6).width = 18;

  // Bordas
  detailSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  return await workbook.xlsx.writeBuffer();
}

// Função para gerar CSV
function generateCSV(data: ReportData) {
  let csv = 'Data,Produto,Categoria,Quantidade,Valor Unitário,Valor Total\n';
  
  data.salesData.forEach(sale => {
    csv += `${new Date(sale.date).toLocaleDateString('pt-BR')},`;
    csv += `"${sale.product}",`;
    csv += `${sale.category},`;
    csv += `${sale.quantity},`;
    csv += `${sale.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })},`;
    csv += `${sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  });

  return csv;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format, data, storeConfig } = body as { format: 'pdf' | 'excel' | 'csv'; data: ReportData; storeConfig?: typeof DEFAULT_STORE };
    const store = storeConfig && typeof storeConfig === 'object' ? { ...DEFAULT_STORE, ...storeConfig } : DEFAULT_STORE;

    if (format === 'pdf') {
      const pdfBuffer = await generatePDF(data, store);
      
      return new NextResponse(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="relatorio-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    } 
    else if (format === 'excel') {
      const excelBuffer = await generateExcel(data, store);
      
      return new NextResponse(excelBuffer as any, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="relatorio-${new Date().toISOString().split('T')[0]}.xlsx"`,
        },
      });
    }
    else if (format === 'csv') {
      const csvContent = generateCSV(data);
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="relatorio-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return NextResponse.json({ 
      error: 'Erro ao gerar relatório',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}