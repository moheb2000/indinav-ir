const express = require('express');
const { Remarkable } = require('remarkable');

const { models } = require('../models/db');

const feed = express.Router();

const md = new Remarkable();

feed.get('/', (req, res) => {
  models.post.findAll({
    limit: 20,
    order: [
      ['createdAt', 'DESC'],
    ],
    attributes: {exclude: ['autherId']},
  }).then(posts => {
    res.set('Content-Type', 'application/rss+xml');
    const hostAddress = `https://${req.get('host')}`;
    let items = '';
    for (let post of posts) {
      items += `
      <item>
        <title>${post.title}</title>
        <link>${hostAddress}/post/${post.slug}</link>
        <description><![CDATA[${md.render(post.body.substring(0, 500) + '...')}]]></description>
        <guid isPermaLink="false">${hostAddress}/post/${post.slug}?id=${post.id}</guid>
        <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      </item>
      `;
    }

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>ایندیناویر</title>
      <link>${hostAddress}</link>
      <description>ایندیناویر</description>
      <copyright>تمام مطالب این سایت تحت پروانه CC BY-SA منتشر می شوند.</copyright>
      <language>fa-ir</language>
      <atom:link href="${hostAddress}/feed.xml" rel="self" type="application/rss+xml" />
      ${items}
    </channel>
    </rss>
    `;
    return res.send(rss);
  }).catch(err => {
    console.log(`[ERROR]: ${err.message}`);

    return res.status(503).json({ error: 'Service unavailable!' });
  });
});

module.exports = feed;
