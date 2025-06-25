const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const Report = require('../models/Report');

// Tipe data Report
const ReportType = new GraphQLObjectType({
  name: 'Report',
  fields: () => ({
    _id: { type: GraphQLString },
    judul: { type: GraphQLString },
    isi: { type: GraphQLString },
    nama: { type: GraphQLString },
    kategori: { type: GraphQLString },
    lokasi: { type: GraphQLString },
    status: { type: GraphQLString },
    tanggal: { type: GraphQLString }, // atau GraphQLDateTime jika kamu pakai scalar
  }),
});


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    laporan: {
      type: new GraphQLList(ReportType),
      args: {
        status: { type: GraphQLString },
        kategori: { type: GraphQLString },
        lokasi: { type: GraphQLString }
      },
      resolve(parent, args) {
        const filter = {};
        if (args.status) filter.status = args.status;
        if (args.kategori) filter.kategori = args.kategori;
        if (args.lokasi) filter.lokasi = args.lokasi;

        return Report.find(filter);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
