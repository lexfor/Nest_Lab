import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2';
import { promisify } from 'util';
import { initializeTables } from './initializations/database-initializator';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE_CONNECTION') private connection: Connection) {
    initializeTables(this.connection);
  }

  executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    const queryAsync = promisify(this.connection.query).bind(this.connection);
    return queryAsync(queryText, values);
  }
}
