'use strict';

import mongoose from 'mongoose';

var EleveSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  num: String
});

export default mongoose.model('Eleve', EleveSchema);
