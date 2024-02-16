import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { setTimeout } from 'node:timers/promises'
import Task from '../src/task.js';

describe('Task Test Suite', () => {
    let _logMock;
    let _task;
    beforeEach(() => {
        _logMock = jest.spyOn(
            console,
            console.log.name
        ).mockImplementation();

        _task = new Task();
    })

    it.skip('Should only run tasks that are due without fake timers(slow)', async () => {
        // AAA = Arrange, Act, Assert

        // Arrange
        const tasks = [
            { 
                name: 'Task-Will-Run-In-5-Secs',
                dueAt: new Date(Date.now() + 5000), // 5 sec
                fn: jest.fn()
            },
            { 
                name: 'Task-Will-Run-In-10-Secs',
                dueAt: new Date(Date.now() + 10000), // 10 sec
                fn: jest.fn()
            }
        ]
        
        // Act 
        _task.save(tasks.at(0))
        _task.save(tasks.at(1))
        
        _task.run(200) // 200ms

        await setTimeout(11e3); // 11_000

        // Assert
        expect(tasks.at(0).fn).toHaveBeenCalled();
        expect(tasks.at(1).fn).toHaveBeenCalled();
    },
        // configurando o jest para aguardar 15 segundos nesse teste
        15e3
    )

    it('Should only run tasks that are due with fake timers(fast)', async () => {
        jest.useFakeTimers() 
        // AAA = Arrange, Act, Assert
        // Arrange
        const tasks = [
            { 
                name: 'Task-Will-Run-In-5-Secs',
                dueAt: new Date(Date.now() + 5000), // 5 sec
                fn: jest.fn()
            },
            { 
                name: 'Task-Will-Run-In-10-Secs',
                dueAt: new Date(Date.now() + 10000), // 10 sec
                fn: jest.fn()
            }
        ]
        
        // Act 
        _task.save(tasks.at(0))
        _task.save(tasks.at(1))
        
        _task.run(200) // 200ms

        jest.advanceTimersByTime(4000);

        // Assert
        expect(tasks.at(0).fn).not.toHaveBeenCalled();
        expect(tasks.at(1).fn).not.toHaveBeenCalled();


        jest.advanceTimersByTime(2000);

        expect(tasks.at(0).fn).toHaveBeenCalled();
        expect(tasks.at(1).fn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(4000);
        expect(tasks.at(1).fn).toHaveBeenCalled();

        jest.useRealTimers()
    })
})
