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

    describe('#save', () => {
        it('should save a person if all the necessary props are included', () => {
            const mockPerson = {
                name: 'Gabriel',
                cpf: '12345678912',
                lastName: 'Francisco'
            }
            console.log = jest.fn();
            Person.save(mockPerson)
            expect(() => Person.save(mockPerson))
                .not
                .toThrow()
            expect(console.log).toHaveBeenCalledWith('Registrado com sucesso!', mockPerson)
        })
        it('should throw an error if a necessary prop is missing', () => {
            const mockInvalidPerson = {
                name: 'Gabriel',
                cpf: '',
                lastName: 'Francisco'
            }
            expect(() => Person.save(mockInvalidPerson))
                .toThrow(new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`))
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