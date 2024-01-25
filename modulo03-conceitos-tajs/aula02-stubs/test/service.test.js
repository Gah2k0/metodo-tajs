import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import Service from '../src/service.js';

describe('Service Test Suite', () => {
    let _service;
    let filename = 'testfile.ndjson'
    beforeEach(() => {
        _service = new Service({
            filename
        })
    })

    describe('#read', () => {
        it('should return an empty array if the file is empty', async () => {
            jest.spyOn(
                fs,
                fs.readFile.name
            ).mockResolvedValue('')

            const result = await _service.read();
            expect(result).toEqual([]);
        })
        it('should return an empty array if the file is does not exist', async () => {
            jest.spyOn(
                fsSync,
                fsSync.existsSync.name
            ).mockReturnValue(false)

            const result = await _service.read();
            expect(result).toEqual([]);
        })
        it('should return an filled array if the file has data', async () => {
            const dbData = [
                {
                username: 'gabriel',
                password: '21345',
                createdAt: new Date().toISOString()
                },
                {
                username: 'Paula',
                password: '21345',
                createdAt: new Date().toISOString()
                }
            ];

            const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('');
            jest.spyOn(
                fsSync,
                'existsSync'
            ).mockResolvedValue(true)
            jest.spyOn(
                fs,
                "readFile"
            ).mockResolvedValue(fileContents)

            const result = await _service.read();
            const expected = dbData
                .map(({ password, ...rest }) => ({ ...rest }))
            expect(result).toStrictEqual(expected);
        })
    })
})