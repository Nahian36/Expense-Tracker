export function hiding(type, vs) {

    if (type == "encrypt") {
        let sqt = Math.sqrt(vs.length);
        let x = Math.floor(sqt);
        let y = Math.ceil(sqt);

        if (x * y < vs.length) {
            if (Math.min(x, y) == x) {
                x++;
            } else {
                y++;
            }
        }

        console.log(vs.length + ' ' + x + ' ' + ' ' + y);

        let arr2d = new Array();

        for (let i = 0; i < x; i++) {

            let arr1d = new Array();

            for (let j = 0; j < y; j++) {
                if (((i * y) + j) < vs.length) {
                    arr1d.push(vs[(i * y) + j]);
                }
            }

            arr2d.push(arr1d);
        }

        let envs = new String();

        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                if (((j * y) + i) < vs.length) {
                    envs += arr2d[j][i];
                }
            }
        }

        //console.log("Inside Encrypt : "+envs);
        return envs;
    } else if (type == "decrypt") {
        let sqt = Math.sqrt(vs.length);
        let x = Math.floor(sqt);
        let y = Math.ceil(sqt);

        if (x * y < vs.length) {
            if (Math.min(x, y) == x) {
                x++;
            } else {
                y++;
            }
        }

        console.log(vs.length + ' ' + x + ' ' + ' ' + y);

        let arr2d = new Array();
        let cnt = 0;

        for (let i = 0; i < y; i++) {

            let arr1d = new Array();

            for (let j = 0; j < x; j++) {

                if (((j * y) + i) < vs.length) {
                    arr1d.push(vs[(i * x) + j - cnt]);
                } else cnt++;
            }

            console.log(arr1d);
            arr2d.push(arr1d);
        }

        let devs = new String();

        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (((i * y) + j) < vs.length) {
                    devs += arr2d[j][i];
                }
            }
        }

        //console.log("Inside decrypt message : "+devs);
        return devs;
    } else {
        console.log("You just did a mistake while writing type for hinding function");
    }

}