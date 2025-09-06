import { MongoClient } from 'mongodb';

import { MONGO_URL } from '../../mongo-credentials';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send('Method Not Allowed');
  }

  const data = req.body;

  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();

  const meetups = db.collection('meetups');

  const result = await meetups.insertOne(data);

  console.log(result);

  await client.close();

  res.status(201).json({
    message: 'Meetup inserted',
  });
}