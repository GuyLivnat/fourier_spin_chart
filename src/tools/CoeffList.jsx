import createCoeff from '../chart/createCoeff';
import List from '../List';
import cat from '/public/defaults/cat.json'
import dog from '/public/defaults/dog.json'
import mushu from '/public/defaults/mushu.json'



const CoeffList = ({coeff, activeId, setActiveId, coeffList, setCoeffList, saveCoeff, units, tick, setTick, stop}) => {

    const loadCoeff = (e) => {
        const id = e.target.parentElement.parentElement.id;
        const obj = JSON.parse(localStorage.getItem(id));
        coeff.current = obj.coeff;
        stop();
        setActiveId(id);
        setTick(tick+1)
    }

    const deleteCoeff = (e) => {
        const id = e.target.parentElement.parentElement.id;
        if (activeId === id) {
            stop();
            coeff.current = [];
        };
        localStorage.removeItem(id)
        setCoeffList(coeffList.filter(item => item.id != id))
    }

    const deleteAllCoeff = () => {
        stop();
        coeff.current = [];
        setCoeffList([]);
        localStorage.clear();
    }

    const saveDefault = (coeffs, name, id) => {
        const obj = JSON.stringify({name: name, coeff: coeffs});
        localStorage.setItem(id, obj);
    }

    const resetDefaultCoeff = () => {
        const missingDefaults = [];
        let catFlag = false;
        let dogFlag = false;
        let mushuFlag = false;

        coeffList.filter((item) => {
            if (item.id === cat.id) catFlag = true;
            if (item.id === dog.id) dogFlag = true;
            if (item.id === mushu.id) mushuFlag = true;
        })

        if (!catFlag) {
            missingDefaults.push({name:cat.name, id:cat.id});
            saveDefault(cat.coeff, cat.name, cat.id);
        }

        if (!dogFlag) {
            missingDefaults.push({name:dog.name, id:dog.id});
            saveDefault(dog.coeff, dog.name, dog.id);
        }

        if (!mushuFlag) {
            missingDefaults.push({name:mushu.name, id:mushu.id});
            saveDefault(mushu.coeff, mushu.name, mushu.id);
        }

        setCoeffList([ ...coeffList, ...missingDefaults])
    }

    const renameCoeff = (id, newName) => {
        const obj = JSON.parse(localStorage.getItem(id));
        obj.name = newName;
        const stringObj = JSON.stringify(obj);
        localStorage.setItem(id, stringObj);
        const newList = coeffList.map((item) => {
            if (item.id === id) return {name:newName, id:id}
            else return item;
        });
        setCoeffList(newList)
    }

    const uploadSVG = (event) => {   // converts an uploaded SVG to something readable 
        const file = event.target.files[0];
        if (file) {
          const name = nameParser(file.name)
          const reader = new FileReader();
          reader.onload = (e) => {
              const string = e.target.result;
              const parser = new DOMParser();
              const parsedFile = parser.parseFromString(string, "image/svg+xml");
              const path = parsedFile.querySelector("path");
              const coeff = createCoeff(path, units);
              saveCoeff(coeff, name) // this function ends here and chains to a new function!
          }
          reader.readAsText(file);
        };
      }

    const nameParser = (name) => {
        return (name.replace('.svg', '') + ` with ${units} points`)
    }

    return (
        <List
            lst={coeffList}
            load={loadCoeff}
            del={deleteCoeff}
            delAll={deleteAllCoeff}
            resetDefaults={resetDefaultCoeff}
            rename={renameCoeff}
            focus={activeId}
            upload={uploadSVG}/>
    )
};

export default CoeffList;

