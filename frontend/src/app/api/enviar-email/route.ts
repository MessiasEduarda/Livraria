import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { clientEmail, clientName, pdfBuffer, fileName } = await request.json();

    // Configurar o transporter do nodemailer
    // ATENÇÃO: Configure suas credenciais de email aqui
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER, // seu email
        pass: process.env.SMTP_PASS, // sua senha ou app password
      },
    });

    // Converter base64 de volta para buffer
    const pdfData = Buffer.from(pdfBuffer, 'base64');

    // Configurar o email
    const mailOptions = {
      from: {
        name: 'Entre Capítulos',
        address: process.env.SMTP_USER || 'noreply@entrecapitulos.com.br'
      },
      to: clientEmail,
      subject: 'Recibo de Compra - Entre Capítulos',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background-color: #ffffff;
              border-radius: 16px;
              padding: 40px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 30px;
              border-bottom: 3px solid #3CAD8C;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #3CAD8C;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #666;
              font-size: 14px;
            }
            .content {
              margin-bottom: 30px;
            }
            .greeting {
              font-size: 18px;
              color: #1a1a1a;
              margin-bottom: 20px;
            }
            .message {
              color: #666;
              font-size: 15px;
              line-height: 1.8;
            }
            .highlight {
              background-color: #e8f5e0;
              padding: 20px;
              border-radius: 10px;
              margin: 25px 0;
              border-left: 4px solid #3CAD8C;
            }
            .highlight-title {
              font-weight: bold;
              color: #3CAD8C;
              margin-bottom: 8px;
              font-size: 16px;
            }
            .highlight-text {
              color: #333;
              font-size: 14px;
            }
            .footer {
              text-align: center;
              padding-top: 30px;
              border-top: 2px solid #e0e0e0;
              margin-top: 30px;
            }
            .footer-text {
              color: #999;
              font-size: 12px;
              margin-bottom: 10px;
            }
            .contact-info {
              color: #666;
              font-size: 13px;
              margin-top: 15px;
            }
            .contact-info a {
              color: #3CAD8C;
              text-decoration: none;
            }
            .icon {
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 5px;
              vertical-align: middle;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📚 Entre Capítulos</div>
              <div class="subtitle">Sistema de Gestão de Livraria</div>
            </div>
            
            <div class="content">
              <div class="greeting">Olá, ${clientName}! 👋</div>
              
              <p class="message">
                Agradecemos por sua compra na <strong>Entre Capítulos</strong>! 
              </p>
              
              <p class="message">
                Sua transação foi concluída com sucesso e estamos muito felizes em tê-lo(a) como nosso cliente.
              </p>
              
              <div class="highlight">
                <div class="highlight-title">📄 Recibo Anexado</div>
                <div class="highlight-text">
                  O recibo detalhado da sua compra está anexado a este email em formato PDF. 
                  Você pode salvá-lo para seus registros ou imprimi-lo, se necessário.
                </div>
              </div>
              
              <p class="message">
                Se você tiver alguma dúvida sobre sua compra ou precisar de assistência, 
                não hesite em entrar em contato conosco. Estamos sempre à disposição para ajudar!
              </p>
              
              <p class="message">
                Esperamos vê-lo(a) novamente em breve! 📖
              </p>
            </div>
            
            <div class="footer">
              <div class="footer-text">
                Este é um email automático. Por favor, não responda a esta mensagem.
              </div>
              
              <div class="contact-info">
                <strong>Entre Capítulos</strong><br>
                Rua dos Livros, 123 - Centro<br>
                São Paulo, SP - CEP 01000-000<br>
                📞 (11) 3456-7890<br>
                ✉️ <a href="mailto:contato@entrecapitulos.com.br">contato@entrecapitulos.com.br</a>
              </div>
              
              <div class="footer-text" style="margin-top: 20px;">
                © 2026 Entre Capítulos - Todos os direitos reservados
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfData,
          contentType: 'application/pdf'
        }
      ]
    };

    // Enviar o email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email enviado com sucesso' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao enviar email', 
        details: error instanceof Error ? error.message : 'Erro desconhecido' 
      },
      { status: 500 }
    );
  }
}