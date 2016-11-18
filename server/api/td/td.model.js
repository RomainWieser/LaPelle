'use strict';

import mongoose from 'mongoose';

var TdSchema = new mongoose.Schema({
  date: String,
  presents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Eleve' }]
});

export default mongoose.model('Td', TdSchema);
