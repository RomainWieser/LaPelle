'use strict';

import mongoose from 'mongoose';
import Eleve from './eleve.model';

var GroupeSchema = new mongoose.Schema({
  name: String,
  eleves: [Eleve.schema]
});

export default mongoose.model('Groupe', GroupeSchema);
