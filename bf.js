let fs = require('fs');
const readlineSync = require('readline-sync');
function getParametersOfProgram() {
let pathToInputFile;
let pathToOutputFile;

process.argv.forEach((val, index) => {
if (index == 2)
pathToInputFile = val;
if (index == 3)
pathToOutputFile = val;
});

if (pathToInputFile == undefined || pathToOutputFile == undefined) {
console.error('ACHTUNG!\nНужно указать пути к считываемому файлу и файлу для вывода результата программы!\nACHTUNG!');
process.exit(-1);
}

return new Array(pathToInputFile, pathToOutputFile);
}
function Find1(text, template) {
let output = "";
hsTemplate = 0;
hstext = 0;
hstextmod = 0;
for (let g = 0; g <= template.length; g++)
	{
		hsTemplate += template.charCodeAt(template[g]);
		hstext += text.charCodeAt(text[g]);
	}
hsTemplate = hsTemplate % 2;
hstextmod = hstext % 2;
if (hsTemplate == hstextmod)
	{
		for (let i = 0; i <= template.length; i++)
		{
			let j = 0;
			if (text[i] == template[j])
		{
			let k = i;
			let p = j;
			let c = i;
			while (text[k] == template[p])
			{
				if (p == template.length - 1)
				{
					output = output + (c + 1).toString() + " ";
					break;
				}
				k++;
				p++;
			}
		}
	}
}

for (let i = template.length + 1; i < text.length - template.length + 1; i++)
{
if (hsTemplate == hstextmod)
{
let j = 0;
if (text[i] == template[j])
{
let k = i;
let p = j;
let c = i;
while (text[k] == template[p])
{
if (p == template.length - 1)
{
output = output + i.toString() + " ";
break;
}
k++;
p++;
}
}
}
else
{
hstext = hstext + text.charCodeAt(text[i + template.length - 1]) - text.charCodeAt(text[i - 1]);
hstextmod = hstext % 2;
}
}
return output;
}
function Find2 (text, template) {
let output = "";
for (let i = 0; i < text.length - template.length + 1; i++) 
{
	let j = 0;
	if (text[i] == template[j])
	{
		let k = i;
		let p = j;
		let c = i;
		while (text[k] == template[p])
		{
			if (p == template.length - 1)
			{
				output = output + (c + 1).toString() + " ";
				break;
			}
			k++;
			p++;
		}
	}
}
return output;
}
function perform(pathToInputFile, pathToOutputFile) {
fs.readFile(pathToInputFile, (err, data) => {
if (err) {
if (err.code == 'ENOENT') {
console.error('ОШИБКА!\nПути ' + pathToInputFile + ' не существует');
process.exit(-1);
}
if (err.code == 'EISDIR') {
console.error('ACHTUNG!\nОжидался путь до файла\nНо указан путь до каталога!');
process.exit(-1);
}
if (err.code == 'EACCES') {
console.error('ACHTUNG!\nОтказано в доступе к файлу ' + pathToInputFile);
process.exit(-1);
}
}
///////////////////
var text = data.toString();
let template = readlineSync.question("Enter your template: ");
if (template.length == 0)
{
	console.log("Template is undefined!!!");
	process.exit(-1);
}
let start = new Date();
let newTextOne = Find1(text, template);
if (newTextOne == "")
{
	console.log("No matches has been found");
	process.exit(-1);
}
let end = new Date();
console.log("Time for hash:", end - start);
start = new Date();
let newTextTwo = Find2(text, template);
if (newTextTwo == "")
{
	console.log("No matches has been found");
	process.exit(-1);
}
end = new Date();
console.log("Time for brute:", end - start);
fs.writeFile(pathToOutputFile, newTextOne, (err) => {
if (err) {
if (err.code == 'EACCES')
console.error('ACHTUNG!\nОтказано в доступе к файлу ' + pathToOutputFile);
process.exit(-1);
}
});
fs.writeFile(pathToOutputFile, newTextTwo, (err) => {
if (err) {
if (err.code == 'EACCES')
console.error('ACHTUNG!\nОтказано в доступе к файлу ' + pathToOutputFile);
process.exit(-1);
}
});
});
}

function main() {
let parametersOfProgram = getParametersOfProgram();
let pathToInputFile = parametersOfProgram[0];
let pathToOutputFile = parametersOfProgram[1];
perform(pathToInputFile, pathToOutputFile);
}
main();
