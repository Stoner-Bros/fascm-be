import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PdfGeneratorService {
  constructor() {
    // Register Handlebars helpers
    handlebars.registerHelper('formatCurrency', function (value) {
      if (!value) return '0 ₫';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value);
    });

    handlebars.registerHelper('formatNumber', function (value) {
      if (!value) return '0';
      return new Intl.NumberFormat('vi-VN').format(value);
    });

    handlebars.registerHelper('add', function (a, b) {
      return a + b;
    });
  }

  async generatePdfFromTemplate(
    templateName: string,
    data: any,
  ): Promise<Buffer> {
    // Read template file
    const templatePath = join(
      process.cwd(),
      'src',
      'templates',
      `${templateName}.hbs`,
    );
    const templateHtml = readFileSync(templatePath, 'utf8');

    // Compile template with data
    const template = handlebars.compile(templateHtml);
    const html = template(data);

    // Launch puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
