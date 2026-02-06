import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { client, items, subtotal, discount, total, paymentMethod, notes, date } = data;

    // Criar um novo documento PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [60, 173, 140]; // #3CAD8C
    const secondaryColor = [102, 102, 102];
    const lightGray = [248, 249, 250];
    const darkGray = [26, 26, 26];

    let yPosition = 20;

    // ========== CABEÇALHO ==========
    doc.setFontSize(24);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Entre Capítulos', 105, yPosition, { align: 'center' });

    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema de Gestão de Livraria', 105, yPosition, { align: 'center' });
    
    yPosition += 5;
    doc.text('Rua dos Livros, 123 - Centro', 105, yPosition, { align: 'center' });
    
    yPosition += 5;
    doc.text('São Paulo, SP - CEP 01000-000', 105, yPosition, { align: 'center' });
    
    yPosition += 5;
    doc.text('Tel: (11) 3456-7890 | contato@entrecapitulos.com.br', 105, yPosition, { align: 'center' });

    yPosition += 8;
    // Linha divisória
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    // ========== TÍTULO DO RECIBO ==========
    yPosition += 10;
    doc.setFontSize(18);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('RECIBO DE VENDA', 105, yPosition, { align: 'center' });

    // Data e hora
    yPosition += 7;
    const saleDate = new Date(date);
    const formattedDate = saleDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = saleDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    doc.setFontSize(9);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${formattedDate} às ${formattedTime}`, 105, yPosition, { align: 'center' });

    // ========== INFORMAÇÕES DO CLIENTE ==========
    yPosition += 15;
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Informações do Cliente', 20, yPosition);

    yPosition += 7;

    // Box de informações do cliente
    doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setDrawColor(224, 224, 224);
    doc.roundedRect(20, yPosition, 170, 30, 2, 2, 'FD');

    yPosition += 7;
    doc.setFontSize(10);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Nome:', 25, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(client.name, 45, yPosition);

    yPosition += 7;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('CPF:', 25, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(client.cpf, 45, yPosition);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Telefone:', 110, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(client.phone, 135, yPosition);

    yPosition += 7;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Email:', 25, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(client.email || 'Não informado', 45, yPosition);

    // ========== PRODUTOS ==========
    yPosition += 15;
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalhamento de Produtos', 20, yPosition);

    yPosition += 7;

    // Preparar dados da tabela de produtos
    const productsTableData = items.map((item: any) => [
      item.title,
      item.author,
      item.quantity.toString(),
      `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `R$ ${(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Produto', 'Autor', 'Qtd', 'Valor Unit.', 'Total']],
      body: productsTableData,
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { cellWidth: 60, halign: 'left' },
        1: { cellWidth: 50, halign: 'left' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' }
      },
      margin: { left: 20, right: 20 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;

    // ========== RESUMO FINANCEIRO (TABELA CENTRALIZADA) ==========
    const summaryData = [
      ['Subtotal', `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]
    ];

    if (discount > 0) {
      summaryData.push([
        'Desconto',
        `- R$ ${discount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      ]);
    }

    summaryData.push([
      'TOTAL',
      `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    ]);

    // Tabela de resumo com colunas de mesma largura e centralizada
    const summaryTableWidth = 100; // largura total da tabela
    const summaryStartX = (210 - summaryTableWidth) / 2; // centralizar na página (A4 tem 210mm de largura)

    autoTable(doc, {
      startY: yPosition,
      body: summaryData,
      theme: 'grid',
      tableWidth: summaryTableWidth,
      bodyStyles: {
        fontSize: 11,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 50, halign: 'left' },  // alinhado à esquerda
        1: { cellWidth: 50, halign: 'right' }   // alinhado à direita
      },
      margin: { left: summaryStartX },
      didParseCell: function(data) {
        // Linha do TOTAL
        if (data.row.index === summaryData.length - 1) {
          data.cell.styles.fontSize = 14;
          data.cell.styles.textColor = primaryColor;
          data.cell.styles.fillColor = [232, 245, 224]; // fundo verde claro
        }
        // Linha do Desconto
        else if (data.column.index === 1 && data.row.index === 1 && discount > 0) {
          data.cell.styles.textColor = [220, 38, 38]; // vermelho para desconto
        }
        // Linha do Subtotal
        else if (data.row.index === 0) {
          data.cell.styles.fillColor = lightGray;
        }
      }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // ========== FORMA DE PAGAMENTO ==========
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'normal');
    doc.text('Forma de Pagamento:', 20, yPosition);

    const paymentLabels: { [key: string]: string } = {
      'dinheiro': 'Dinheiro',
      'debito': 'Cartão de Débito',
      'credito': 'Cartão de Crédito',
      'pix': 'PIX'
    };

    yPosition += 6;
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(paymentLabels[paymentMethod] || paymentMethod, 20, yPosition);

    // ========== OBSERVAÇÕES ==========
    if (notes && notes.trim() !== '') {
      yPosition += 12;

      doc.setFontSize(10);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('Observações:', 20, yPosition);

      yPosition += 7;

      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setDrawColor(224, 224, 224);
      doc.roundedRect(20, yPosition, 170, 25, 2, 2, 'FD');

      yPosition += 6;
      doc.setFontSize(9);
      doc.setTextColor(51, 51, 51);
      doc.setFont('helvetica', 'normal');
      
      const splitNotes = doc.splitTextToSize(notes, 160);
      doc.text(splitNotes, 25, yPosition);
    }

    // ========== RODAPÉ ==========
    const footerY = 280;

    // Linha divisória
    doc.setDrawColor(224, 224, 224);
    doc.setLineWidth(0.3);
    doc.line(20, footerY, 190, footerY);

    doc.setFontSize(8);
    doc.setTextColor(153, 153, 153);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório gerado automaticamente pelo Sistema de Gestão de Livraria', 105, footerY + 5, { align: 'center' });
    doc.text('© 2026 Entre Capítulos - Todos os direitos reservados', 105, footerY + 10, { align: 'center' });

    doc.setFontSize(7);
    doc.text('Página 1 de 1', 105, footerY + 16, { align: 'center' });

    // Gerar o PDF como buffer
    const pdfBuffer = doc.output('arraybuffer');

    // Retornar o PDF como resposta
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="recibo-venda-${Date.now()}.pdf"`,
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