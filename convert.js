function argumentErrorExit()
{
    console.log('Invalid parameters');
}
const UNITS = 'mg';
const PREFIXES = 'mcd���k'; // position of prefix in string minus 3 = tens potency  of prefix | the character � is just a placeholder
/*
if query below is true, if following things are fullfilled:
    - right number of arguments
    - 1st argument is a float or int
    - 3rd argument is the string 'to'
    - 2nd and 4th argument have a length of two or one
        - if the length is 2: test if the prefix is correct & test if the unit is correct
        - if the length is 1 (there is no prefix): test if the unit is correct
    - is the unit of the 2nd argument the same used in the 4th argument (you cannot convert kg to m)
*/
if( process.argv.length === 6
&&  !!parseFloat(process.argv[2])
&&  process.argv[4] === 'to'
&&  ((process.argv[3].length === 2 && process.argv[3].substr(0,1).match(`[${PREFIXES}]`) && process.argv[3].substr(1,1).match(`[${UNITS}]`))
    ||  (process.argv[3].length === 1 && process.argv[3].match(`[${UNITS}]`))
    )
&&  ((process.argv[5].length === 2 && process.argv[5].substr(0,1).match(`[${PREFIXES}]`) && process.argv[5].substr(1,1).match(`[${UNITS}]`))
||  (process.argv[5].length === 1 && process.argv[5].match(`[${UNITS}]`))
)
&&  process.argv[5].endsWith(process.argv[3].substr(-1))
){
    console.log(`${process.argv[2]} ${process.argv[3]} are ${process.argv[2] * (10**(PREFIXES.indexOf(('�'+ process.argv[3]).substr(-2,1))-3)/10**(PREFIXES.indexOf(('�'+ process.argv[5]).substr(-2,1))-3))} ${process.argv[5].replace('�','')}`);
    /*
    the above console.log call logs following things:
        - source number
        - source unit
        - the string 'are'
        - the result number
            - it takes the source number and multiplies it with (10 to the power of the position of the source prefix in the PREFIXES string minus 3) divided by (10 to the power of the result prefix in the PREFIXES string mins 3)
            - example: for '5 km to mm' it calculates 5 * 10**3 / 10**-3
            - � = (some character the user will definitely not use as an argument)
            - I add a � in front of the unit as a backup prefix if the unit has no prefix.
              After that I get the second last character in the string via substr(-2,1) which will either be the prefix or the � character.
              Either way indexOf(2nd last caracter) will return the tens potence* I have to work with.
                * it's the tens potence plus 3
                - example: indexOf('�') is 3; indexOf('m') is 0; indexOf('k') is 6
                - indexOf('�') returns 3 (and not 4 or 5) because it returns the 1st occurrence of the character
    */
} else{
    argumentErrorExit();
}
