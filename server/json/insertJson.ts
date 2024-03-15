import con from '../util/db';
import fs from 'fs';

interface Drink {
  acCategory: string;
  acImgPath: string;
  acName: string;
  acCompany: string;
  acDesc: string;
  acAbv: string;
}

async function main() {
  // MySQL에 연결

  // JSON 파일 읽기
  const data = fs.readFileSync('./json/acList.json', 'utf8');
  const drinks: Drink[] = JSON.parse(data);

  // 모든 음료에 대해 쿼리 실행
  for (const drink of drinks) {
    const { acCategory, acImgPath, acName, acCompany, acDesc, acAbv } = drink;
  
    const sql = 'INSERT INTO drinklist (acCategory, acImgPath, acName, acCompany, acDesc, acAbv) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [acCategory, acImgPath, acName, acCompany, acDesc, acAbv];
  
    const [result] = await con.query(sql, values);
    console.log('Inserted: ' + acName);
  }

  // 연결 종료
  await con.end();
}

main();