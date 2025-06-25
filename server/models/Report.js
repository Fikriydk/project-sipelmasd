const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    nama: { type: String, required: true},
    judul: { type: String, required: true },
    isi: { type: String, required: true },
    kategori: { type: String, require: true },
    lokasi: { type: String, require: true },
    status: { type: String, default: "Pending" },
    userId: { type: String, required: true },
    tanggal: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", reportSchema);