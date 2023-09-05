import { DecryptCommand, EncryptCommand, KMSClient } from '@aws-sdk/client-kms';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';

const client = new KMSClient({
  region: process.env.AWS_DEFAULT_REGION || 'ap-northeast-1',
});

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'See README.md for usage!!!';
  }

  /**
   * 暗号化して保存
   */
  async encrypt(plaintext: string): Promise<User> {
    // KMSで暗号化するためのパラメータ作成
    const encryptCommand = new EncryptCommand({
      KeyId: process.env.KMS_KEY_ID ?? '', // KMSのキーID
      Plaintext: new TextEncoder().encode(plaintext), // 暗号化する文字列
    });

    // KMSで暗号化実行
    const encryptResponse = await client.send(encryptCommand);
    const encryptBinary = encryptResponse.CiphertextBlob ?? new Uint8Array(); // レスポンスから暗号化されたBLOB取得

    // BLOBをBase64エンコード
    const encryptString = Buffer.from(encryptBinary).toString('base64');

    // 保存
    const insert = await this.prismaService.user.create({
      data: {
        kmsEncrypt: encryptString,
      },
    });
    return insert;
  }

  /**
   * 取得して複合
   */
  async decrypt(id: number): Promise<string> {
    // DBレコード取得
    const select = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    const encryptString = select?.kmsEncrypt ?? '';
    if (!encryptString) return 'NotFound'; // 存在しない場合return

    // Base64デコード
    const encryptBinary = Uint8Array.from(Buffer.from(encryptString, 'base64'));

    // KMSで複合するためのパラメータ作成
    const decryptCommand = new DecryptCommand({
      KeyId: process.env.KMS_KEY_ID ?? '', // KMSのキーID
      CiphertextBlob: encryptBinary, // 複合する暗号化された平文
    });

    // KMSで複合実行
    const decryptResponse = await client.send(decryptCommand);
    const decryptBinary = decryptResponse.Plaintext ?? ''; // レスポンスからPlaintextのBLOBを取得

    // BLOBをStringに
    const plaintext = Buffer.from(decryptBinary).toString();

    return plaintext;
  }
}
