const express = require('express');
const fs = require('fs/promises');
const ipl = express.Router();

ipl.get('/Matchesplayed', (req, res) => {
  res.sendFile('/home/abhishek/Mountblue/express/api/matches.json');
});

ipl.get('/insuperover', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/bestEconomyinsuperover.json'
  );
});

ipl.get('/Extras2016', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/extrasIn2016.json'
  );
});

ipl.get('/Dismissal', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/HighesnumberofTimes.json'
  );
});

ipl.get('/Pom', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/PlayerofMatchperSeason.json'
  );
});

ipl.get('/top10eco', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/top10economicalbowlerin2015.json'
  );
});

ipl.get('/wontoss', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/TimesteamwonMatcesandToss.json'
  );
});

ipl.get('/eachseason', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/MatchesPlayedineachSeason.json'
  );
});

ipl.get('/strikerate', (req, res) => {
  res.sendFile(
    '/home/abhishek/Mountblue/express/api/strikerate.json'
  );
});

module.exports = ipl;
