// достать все блоки
// пройтись по twig файлам спарсить классы
// в классах не должно быть классов не совпадающих с названием файла, за исключением g-

const dirTree = require("directory-tree");
const fs = require('fs');
var check =
{
	twigRegex: /class="([a-zA-Z0-9\-|_ ]*)"/g,
	scssRegex: /\.([a-zA-Z0-9\-|_]*)/g,
	maxScssNextingLevel: 10,
	start()
	{
		let twigErrors = null, scssErrors = null;
		const tree = dirTree("./src/blocks/",{extensions:/\.twig$/},(item, PATH, stats) =>
		{
			const file = fs.readFileSync(item.path, 'utf8');
			if (!file)
				process.exit(1);

			twigErrors = this.checkFile(item, file, this.twigRegex);
		});
		scssErrors = this.checkScssFiles();

		if ((scssErrors && scssErrors.length) || (twigErrors && twigErrors.length))
			process.exit(1);
	},
	checkScssFiles()
	{
		let scssErrors = null;
		const tree = dirTree("./src/blocks/",{extensions:/\.scss$/},(item, PATH, stats) =>
		{
			const file = fs.readFileSync(item.path, 'utf8');
			if (!file)
				process.exit(1);

			scssErrors = this.checkFile(item, file, this.scssRegex);
			scssErrors.push(...this.checkNestingLevelError(item, file));
		});
		return scssErrors;
	},
	checkNestingLevelError(fileObject, fileContent)
	{
		this.checkFileBrackets(fileObject, fileContent);
		let m;
		let errors = [];
		const regex = /{[^}].*?{.*?}/g;
		const nesting = regex.exec(fileContent);

		while ((m = regex.exec(fileContent.replace(/\s/g, ''))) !== null)
		{
			if (m.index === regex.lastIndex)
				regex.lastIndex++;

			if (!m[0])
				continue;
			let nestedLevels = m[0].match(this.scssRegex);
			if (nestedLevels && nestedLevels.length > this.maxScssNextingLevel)
			{
				let error = `Max nesting level is ${this.maxScssNextingLevel}, found ${nestedLevels.length} Path "${fileObject.path}"`;
				errors.push(error);
				console.log(error);
			}
		}
		return errors;
	},
	/**
	 * Console errors
	 * return errors[]
	 */
	checkFile(fileObject,fileContent,regex)
	{
		let m;
		let errors = [];
		if (fileObject.extension == '.twig')
		{
			let fileName = fileObject.name.replace(fileObject.extension,'');
			let fileDir = fileObject.path.replace(fileObject.name, '');
			let dirName = fileDir.replace(/[/]/g, ' ');
			let dir = dirName.substring(dirName.length - fileName.length - 1, dirName.length-1).split(/\s+/);
			for (let folderName of dir)
			{
				if(folderName == fileName ||
				dirName.indexOf('vendors') !== -1 ||
				fileName.indexOf('g-') !== -1 ||
				fileName.indexOf('_') !== -1
				 )
					continue;
				else
				{
					errors.push(`Wrong  fileName "${fileName}" Path ${fileObject.path}`);
				}
			}
		}
		while ((m = regex.exec(fileContent)) !== null)
		{
			if (m.index === regex.lastIndex)
				regex.lastIndex++;

			if(typeof m[1] == 'undefined')
				continue;

			errors.push( ...this.checkClassMatching(fileObject,m[1],fileContent) );
		}
		if(errors.length > 0)
			for(let error of errors)
				console.error(error);

		return errors;
	},

	exceptions:['container','active','open','error'],

	/**
	 * return errors[]
	 */
	checkClassMatching(fileObject,classes, fileContent)
	{
		let fileName = fileObject.name.replace(fileObject.extension,'');
		let fileDir = fileObject.path.replace(fileObject.name, '');
		let dirName = fileDir.replace(/[/]/g, ' ');
		let vendors = dirName.indexOf('vendors');
		classes = classes.split(/\s+/);
		let errors = [];
		let dependsClass = false;
		let content = fileContent.toString().split("\n");
		for (bascket of content)
			{
				if (bascket.indexOf('&') !== -1)
				{
					dependsClass = true;
				}
			}
		for(let className of classes)
		{
			if(this.exceptions.indexOf(className) !== -1 ||
				className == fileName ||
				className.indexOf('g-') == 0 ||
				className.indexOf('_') == 0 ||
				vendors !== -1 ||
				dependsClass == true

			)
				continue;
			else
				errors.push(`Wrong class name "${className}" Path ${fileObject.path}`);
		}
		return errors;
	},
	checkFileBrackets(fileObject, fileContent)
	{
		let fileName = fileObject.name.replace(fileObject.extension,'');
		let fileDir = fileObject.path.replace(fileObject.name, '');
		let dirName = fileDir.replace(/[/]/g, ' ');
		let vendors = dirName.indexOf('vendors');
		let bascketLen = 0;
		if(vendors !== -1) return;
		else
		{
		let content = fileContent.toString();
		content = content.split("\n");
		for (bascket of content)
			{
				if (bascket.indexOf('{') !== -1)
				{
					bascketLen ++;
					if(bascketLen > 4) console.log(`Wrong Large nesting capacity! Path ${fileObject.path}`);
				}
				else if (bascket.indexOf('}') !== -1)
				{
					bascketLen --;
				}
			}
		}
	}
};

check.start();
