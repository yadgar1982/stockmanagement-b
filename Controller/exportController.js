import ExcelJS from "exceljs";
import Sale from "../Model/ExportSales.js";
import Purchase from "../Model/ExportPurchase.js";
import Payment from "../Model/payment.model.js";

export const exportSales = async (req, res) => {
  try {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=sales.xlsx"
    );

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      stream: res,
      useStyles: true,
    });

    const sheet = workbook.addWorksheet("Sales");

    sheet.columns = [
      { header: "Invoice No", key: "invoiceNo", width: 18 },
      { header: "Product", key: "productName", width: 20 },
      { header: "Category", key: "categoryName", width: 20 },
      { header: "Quantity", key: "quantity", width: 12 },
      { header: "Unit", key: "unit", width: 10 },
      { header: "Customer", key: "customerName", width: 20 },
      { header: "Company", key: "companyName", width: 20 },
      { header: "Warehouse", key: "warehouseName", width: 20 },
      { header: "Unit Cost", key: "unitCost", width: 12 },
      { header: "Total Cost", key: "totalCost", width: 15 },
      { header: "Local Total", key: "totalLocalCost", width: 15 },
      { header: "Currency", key: "currency", width: 10 },
      { header: "Commission", key: "totalComission", width: 15 },
      { header: "Dealer", key: "dealerName", width: 18 },
      { header: "Country", key: "countryName", width: 15 },
      { header: "Batch", key: "batch", width: 15 },
      { header: "Sales Date", key: "salesDate", width: 18 },
      { header: "Created At", key: "createdAt", width: 22 },
    ];

    // Header style
    sheet.getRow(1).font = { bold: true };

    // Currency formatting
    sheet.getColumn("unitCost").numFmt = "#,##0.00";
    sheet.getColumn("totalCost").numFmt = "#,##0.00";
    sheet.getColumn("totalLocalCost").numFmt = "#,##0.00";
    sheet.getColumn("totalComission").numFmt = "#,##0.00";

    // MongoDB cursor (memory-safe)
    const cursor = Sale.find().cursor();

    for await (const sale of cursor) {
      sheet.addRow({
        invoiceNo: sale.invoiceNo,
        productName: sale.productName,
        categoryName: sale.categoryName,
        quantity: sale.quantity,
        unit: sale.unit,
        customerName: sale.customerName,
        companyName: sale.companyName,
        warehouseName: sale.warehouseName,
        unitCost: sale.unitCost,
        totalCost: sale.totalCost,
        totalLocalCost: sale.totalLocalCost,
        currency: sale.currency,
        totalComission: sale.totalComission,
        dealerName: sale.dealerName,
        countryName: sale.countryName,
        batch: sale.batch,
        salesDate: sale.salesDate,
        createdAt: sale.createdAt,
      }).commit();
    }

    sheet.commit();
    await workbook.commit();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sales export failed" });
  }
};
export const exportPurchase = async (req, res) => {
  try {
    // Create workbook (regular, not streaming)
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Purchases");

    // Define columns
    sheet.columns = [
      { header: "Invoice No", key: "invoiceNo", width: 18 },
      { header: "Product", key: "productName", width: 20 },
      { header: "Category", key: "categoryName", width: 20 },
      { header: "Quantity", key: "quantity", width: 12 },
      { header: "Unit", key: "unit", width: 10 },
      { header: "Customer", key: "customerName", width: 20 },
      { header: "Company", key: "companyName", width: 20 },
      { header: "Warehouse", key: "warehouseName", width: 20 },
      { header: "Unit Cost", key: "unitCost", width: 12 },
      { header: "Total Cost", key: "totalCost", width: 15 },
      { header: "Local Total", key: "totalLocalCost", width: 15 },
      { header: "Currency", key: "currency", width: 10 },
      { header: "Commission", key: "totalComission", width: 15 },
      { header: "Dealer", key: "dealerName", width: 18 },
      { header: "Country", key: "countryName", width: 15 },
      { header: "Batch", key: "batch", width: 15 },
      { header: "Purchase Date", key: "purchaseDate", width: 18 },
      { header: "Created At", key: "createdAt", width: 22 },
    ];

    // Header styling
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // bold & white text
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF808080" }, // gray background
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Currency formatting
    sheet.getColumn("unitCost").numFmt = "#,##0.00";
    sheet.getColumn("totalCost").numFmt = "#,##0.00";
    sheet.getColumn("totalLocalCost").numFmt = "#,##0.00";
    sheet.getColumn("totalComission").numFmt = "#,##0.00";

    // Fetch purchases from DB
    const purchases = await Purchase.find();

    // Add data rows
    purchases.forEach((p) => {
      sheet.addRow({
        invoiceNo: p.invoiceNo,
        productName: p.productName,
        categoryName: p.categoryName,
        quantity: p.quantity,
        unit: p.unit,
        customerName: p.customerName,
        companyName: p.companyName,
        warehouseName: p.warehouseName,
        unitCost: p.unitCost,
        totalCost: p.totalCost,
        totalLocalCost: p.totalLocalCost,
        currency: p.currency,
        totalComission: p.totalComission,
        dealerName: p.dealerName,
        countryName: p.countryName,
        batch: p.batch,
        purchaseDate: p.purchaseDate,
        createdAt: p.createdAt,
      });
    });

    // Set headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=purchases.xlsx"
    );

    // Write workbook to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Purchase export failed" });
  }
};
export const exportPayment = async (req, res) => {
  try {
    // Create workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Payments");

    // Define columns based on Payment model
    sheet.columns = [
      { header: "Payment No", key: "paymentNo", width: 15 },
      { header: "Supplier", key: "supplierName", width: 25 },
      { header: "Company", key: "companyName", width: 20 },
      { header: "Transaction By", key: "transBy", width: 20 },
      { header: "Entity", key: "entity", width: 15 },
      { header: "Amount", key: "amount", width: 12 },
      { header: "Exchanged Amt", key: "exchangedAmt", width: 15 },
      { header: "Currency", key: "currency", width: 10 },
      { header: "Country", key: "countryName", width: 15 },
      { header: "Payment Type", key: "paymentType", width: 15 },
      { header: "Transaction Type", key: "transactionType", width: 15 },
      { header: "Party No", key: "partyNo", width: 12 },
      { header: "Description", key: "description", width: 30 },
      { header: "Payment Date", key: "paymentDate", width: 18 },
      { header: "User Name", key: "userName", width: 15 },
      { header: "Created At", key: "createdAt", width: 22 },
      { header: "Passed", key: "isPassed", width: 10 },
    ];

    // Header style
    sheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF808080" }, // gray background
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Fetch payments from DB
    const payments = await Payment.find();

    // Add data rows
    payments.forEach((p) => {
      sheet.addRow({
        paymentNo: p.paymentNo,
        supplierName: p.supplierName,
        companyName: p.companyName,
        transBy: p.transBy,
        entity: p.entity,
        amount: p.amount,
        exchangedAmt: p.exchangedAmt,
        currency: p.currency,
        countryName: p.countryName,
        paymentType: p.paymentType,
        transactionType: p.transactionType,
        partyNo: p.partyNo,
        description: p.description,
        paymentDate: p.paymentDate,
        userName: p.userName,
        createdAt: p.createdAt,
        isPassed: p.isPassed ? "Yes" : "No",
      });
    });

    // Number formatting for amounts
    sheet.getColumn("amount").numFmt = "#,##0.00";
    sheet.getColumn("exchangedAmt").numFmt = "#,##0.00";

    // Set headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=payments.xlsx"
    );

    // Write workbook to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment export failed" });
  }
};