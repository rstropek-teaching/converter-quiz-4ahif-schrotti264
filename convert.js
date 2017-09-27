function argumentErrorExit()
{
    console.log('Invalid parameters');
}
const UNITS = 'mg';
// Something went wrong with your checkin. The `?` chars are strange. However, the code still works.
const PREFIXES = 'mcd���k';
if( process.argv.length === 6
&&  !!parseFloat(process.argv[2])
&&  process.argv[4] === 'to'
// Why do you check for `process.argv[4]` and `process.argv` in the next lines?
// These checks must evaluate to true, don't they?
&&  ((process.argv[3].length === 2 && process.argv[3].substr(0,1).match(`[${PREFIXES}]`) && process.argv[4])
    ||  (process.argv[3].length === 1 && process.argv[3].match(`[${UNITS}]`))
    )
&&  ((process.argv[5].length ===  2 && process.argv)
    ||  (process.argv[5].length === 1 && process.argv[5].match(`[${UNITS}]`))
    )
&&  process.argv[5].endsWith(process.argv[3].substr(-1))
){
    process.argv[3] = `�${process.argv[3]}`;
    process.argv[5] = `�${process.argv[5]}`;
    console.log(`${process.argv[2]} ${process.argv[3].replace('�','')} are ${process.argv[2] * (10**(PREFIXES.indexOf(process.argv[3].substr(-2,1))-3)/10**(PREFIXES.indexOf(process.argv[5].substr(-2,1))-3))} ${process.argv[5].replace('�','')}`);
} else{
    argumentErrorExit();
}
