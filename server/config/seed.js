/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Groupe from '../api/groupe/groupe.model';
import Tds from '../api/td/td.model';

Groupe.find({}).remove()
  .then(() => {
    Groupe.create({
        name: "Groupe 1",
        eleves: [{
          nom: "Wieser",
          prenom: "Romain",
          num: "21"
        },{
          nom: "Brossard",
          prenom: "Chloé",
          num: "15"
        }]
      },{
        name: "Groupe 2",
        eleves: [{
          nom: "Brossard",
          prenom: "Chloé",
          num: "15"
        }]
      })
      .then(() => {
        console.log('finished populating groups');
      });
  });

User.find({}).remove()
  .then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });

  Tds.find({}).remove().then(() => {
        console.log('finished cleaning tds');
      });