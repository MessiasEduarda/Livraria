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
async function generatePDF(data: ReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Calcular estatísticas reais dos dados
  const stats = calculateStats(data.salesData);

  const primaryColor = [11, 66, 0];
  const secondaryColor = [102, 102, 102];
  const lightGray = [248, 249, 250];

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

  // Informações do Relatório
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Informações do Relatório', 20, yPosition);
  
  yPosition += 7;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  doc.text(`• Tipo: ${data.reportType}`, 25, yPosition);
  yPosition += 5;
  doc.text(`• Período: ${new Date(data.startDate).toLocaleDateString('pt-BR')} - ${new Date(data.endDate).toLocaleDateString('pt-BR')}`, 25, yPosition);
  yPosition += 5;
  doc.text(`• Categoria: ${data.category}`, 25, yPosition);
  yPosition += 10;

  // Resumo Executivo
  doc.setFontSize(14);
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
    tableWidth: 'auto',
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
    tableWidth: 'auto',
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

  return doc.output('arraybuffer');
}

// Função para gerar Excel
async function generateExcel(data: ReportData) {
  const workbook = new ExcelJS.Workbook();
  
  // Calcular estatísticas reais dos dados
  const stats = calculateStats(data.salesData);
  
  // Propriedades do workbook
  workbook.creator = 'Entre Capítulos';
  workbook.created = new Date();
  
  // Sheet 1: Resumo
  const summarySheet = workbook.addWorksheet('Resumo', {
    properties: { tabColor: { argb: 'FF0b4200' } }
  });

  // Título
  summarySheet.mergeCells('A1:F1');
  const titleCell = summarySheet.getCell('A1');
  titleCell.value = 'RELATÓRIO DE VENDAS';
  titleCell.font = { size: 18, bold: true, color: { argb: 'FF0b4200' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  summarySheet.getRow(1).height = 30;

  // Subtítulo
  summarySheet.mergeCells('A2:F2');
  const subtitleCell = summarySheet.getCell('A2');
  subtitleCell.value = 'Entre Capítulos - Sistema de Gestão';
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
  summarySheet.addRow(['INFORMAÇÕES DO RELATÓRIO']).font = { bold: true, size: 12 };
  summarySheet.addRow(['Tipo:', data.reportType]);
  summarySheet.addRow(['Período:', `${new Date(data.startDate).toLocaleDateString('pt-BR')} - ${new Date(data.endDate).toLocaleDateString('pt-BR')}`]);
  summarySheet.addRow(['Categoria:', data.category]);
  
  summarySheet.addRow([]);

  // Resumo Executivo
  summarySheet.addRow(['RESUMO EXECUTIVO']).font = { bold: true, size: 12 };
  
  const statsHeader = summarySheet.addRow(['Métrica', 'Valor']);
  statsHeader.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  statsHeader.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0b4200' }
  };
  statsHeader.alignment = { horizontal: 'center', vertical: 'middle' };

  summarySheet.addRow(['Receita Total', `R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
  summarySheet.addRow(['Total de Vendas', stats.totalSales]);
  summarySheet.addRow(['Ticket Médio', `R$ ${stats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]);
  summarySheet.addRow(['Produtos Vendidos', stats.totalProducts]);

  // Ajustar largura das colunas
  summarySheet.getColumn(1).width = 25;
  summarySheet.getColumn(2).width = 30;

  // Sheet 2: Detalhamento
  const detailSheet = workbook.addWorksheet('Detalhamento', {
    properties: { tabColor: { argb: 'FF2563eb' } }
  });

  // Cabeçalho
  const headerRow = detailSheet.addRow(['Data', 'Produto', 'Categoria', 'Quantidade', 'Valor Unitário', 'Valor Total']);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0b4200' }
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
    const { format, data }: { format: 'pdf' | 'excel' | 'csv', data: ReportData } = await request.json();

    if (format === 'pdf') {
      const pdfBuffer = await generatePDF(data);
      
      return new NextResponse(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="relatorio-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    } 
    else if (format === 'excel') {
      const excelBuffer = await generateExcel(data);
      
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