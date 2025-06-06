/*
export interface TimerRecord {
  id: string;
  date: string;
  time: string;
  duration: number;
  completed: boolean;
}

export class StorageService {
  private static instance: StorageService;
  private readonly STORAGE_KEY = 'water_reminder_records';

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // Create a new record
  public createRecord(record: Omit<TimerRecord, 'id'>): TimerRecord {
    const records = this.getAllRecords();
    const newRecord: TimerRecord = {
      ...record,
      id: crypto.randomUUID(),
    };

    records.push(newRecord);
    this.saveRecords(records);
    return newRecord;
  }

  // Get all records
  public getAllRecords(): TimerRecord[] {
    const records = localStorage.getItem(this.STORAGE_KEY);
    return records ? JSON.parse(records) : [];
  }

  // Get a single record by ID
  public getRecord(id: string): TimerRecord | null {
    const records = this.getAllRecords();
    return records.find(record => record.id === id) || null;
  }

  // Update a record
  public updateRecord(id: string, updates: Partial<TimerRecord>): TimerRecord | null {
    const records = this.getAllRecords();
    const index = records.findIndex(record => record.id === id);

    if (index === -1) return null;

    const updatedRecord = {
      ...records[index],
      ...updates,
    };

    records[index] = updatedRecord;
    this.saveRecords(records);
    return updatedRecord;
  }

  // Delete a record
  public deleteRecord(id: string): boolean {
    const records = this.getAllRecords();
    const filteredRecords = records.filter(record => record.id !== id);

    if (filteredRecords.length === records.length) {
      return false;
    }

    this.saveRecords(filteredRecords);
    return true;
  }

  // Clear all records
  public clearAllRecords(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Get records by date range
  public getRecordsByDateRange(startDate: string, endDate: string): TimerRecord[] {
    const records = this.getAllRecords();
    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    });
  }

  // Get records for today
  public getTodayRecords(): TimerRecord[] {
    const today = new Date().toISOString().split('T')[0];
    return this.getAllRecords().filter(record => record.date === today);
  }

  private saveRecords(records: TimerRecord[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
  }
} */


export const DURATION_KEY = 'DURATION';
export const REPEAT_KEY = 'REPEAT';
export const ENABLE_NOTIFICATION_KEY = 'ENABLE_NOTIFICATION';
export const USER_KEY = 'USER';
