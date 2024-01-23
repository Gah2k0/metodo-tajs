import { describe, it, jest } from '@jest/globals';
import Person from '../src/person';

describe('#Person Suite', () => {
    describe('#validate', () => {
        it('should throw an error if the name is not present', () => {
            const mockInvalidPerson = { 
                cpf: '123.456.789-12',
                name: ''
            };
            // () => Person.validate(mockInvalidPerson) delegate da execução da função
            expect(() => Person.validate(mockInvalidPerson))
                .toThrow(new Error('name is required'));
        })
        it('should throw an error if the cpf is not present', () => {
            const mockInvalidPerson = { 
                cpf: '',
                name: 'Gabinelon'
            };
            expect(() => Person.validate(mockInvalidPerson))
                .toThrow(new Error('cpf is required'));
        })
        it('should not throw an error if all the expected fields are present', () => {
            const mockInvalidPerson = { 
                cpf: '123.456.789-12',
                name: 'Gabinelon'
            };
            expect(() => Person.validate(mockInvalidPerson))
                .not
                .toThrow();
        })
    })

    describe('#format', () => {
        it('should format the person name and cpf', () => {
            // AAA

            // Arrange
            const mockPerson = { 
                cpf: '123.456.789-12',
                name: 'Gabriel Francisco'
            };
            // Act
            const result = Person.format(mockPerson);
            // Assert
            const expected = {
                name: 'Gabriel',
                cpf: '12345678912',
                lastName: 'Francisco'
            }
            expect(result).toStrictEqual(expected);
        })
    })

    describe('#process', () => {
        it('should process a valid person', () => {
            const mockPerson = {
                name: 'Gabriel Francisco',
                cpf: '123.456.789-12',
            }
            jest.spyOn(
                Person,
                Person.validate.name
            ).mockReturnValue();
            // .mockImplementation(() => {
            //     throw new Error('Deu ruim!');
            // })
            jest.spyOn(
                Person,
                Person.format.name
            ).mockReturnValue({
                name: 'Gabriel',
                cpf: '12345678912',
                lastName: 'Francisco'
            });

            const result = Person.process(mockPerson);
            const expected = 'ok'
            expect(result).toStrictEqual(expected);
        })
    })
})