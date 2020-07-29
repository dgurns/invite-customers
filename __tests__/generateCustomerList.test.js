const { generateCustomerList } = require('../generateCustomerList.js');

describe('generateCustomerList', () => {
  it('should return an ordered customer list extracted from the given source file', async () => {
    const result = await generateCustomerList('customers.txt');
    expect(result).toEqual(`Ian Kehoe - User ID: 4
Nora Dempsey - User ID: 5
Theresa Enright - User ID: 6
Eoin Ahearn - User ID: 8
Richard Finnegan - User ID: 11
Christina McArdle - User ID: 12
Olive Ahearn - User ID: 13
Michael Ahearn - User ID: 15
Patricia Cahill - User ID: 17
Eoin Gallagher - User ID: 23
Rose Enright - User ID: 24
Stephen McArdle - User ID: 26
Oliver Ahearn - User ID: 29
Nick Enright - User ID: 30
Alan Behan - User ID: 31
Lisa Ahearn - User ID: 39`);
  });

  it('should return an error message when no filename is passed in', async () => {
    const result = await generateCustomerList();
    expect(result).toEqual('No filename provided');
  });

  it('should return an error message when it is provided an empty file', async () => {
    const result = await generateCustomerList('__mocks__/empty.txt');
    expect(result).toEqual('Could not parse customers from input file');
  });

  it('should return an error message when it is provided a file with invalid data', async () => {
    const result = await generateCustomerList('__mocks__/invalid.txt');
    expect(result).toEqual('Invalid customers data');
  });
});
