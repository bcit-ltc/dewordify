export default constructSliders;

function constructSliders($, _markoutMap) {

    $(".slider").each(function () {
        const start = [];
        const end = [];
        let i = 0;
        $(this).children().each(function () {
            const isHeader = $(this).is("h2");
            const isImage = $(this).is("img");
            const isPrevHeader = $(this).prev().is("h2");
            const isPrevImage = $(this).prev().is("img");
            const isNextHeader = $(this).next().is("h2");
            const isNextImage = $(this).next().is("img");
            const isNextSlide = isNextHeader || isNextImage;

            if (isHeader) {
                if (isNextImage) {
                    //console.log("\x1b[34m", "Header with image next");
                    start.push(i);
                } else {
                    //console.log("\x1b[34m", "Header with no image. >>> inserting <img>");
                    $(this).after($("<img>"));
                    start.push(i++);
                }
            } else if (isImage) {
                if (isPrevHeader) {
                    if (isNextSlide) {
                        //console.log("\x1b[34m", "Image with previous header and next image");
                        end.push(i + 1);
                    }
                } else {
                    if (isPrevImage) {
                        if (isNextSlide) {
                            //console.log("\x1b[34m", "IMAGE ONLY");
                            start.push(i);
                            end.push(i + 1);
                        }
                    } else {
                        //console.log("\x1b[34m", "Image with no header and previous NOT image");
                        start.push(i);
                    }
                }
            } else {
                if (isNextSlide) {
                    //console.log("\x1b[34m", "NOT image, NOT header, and next image/header");
                    end.push(i + 1);
                } else {
                    //console.log("EXTRA STUFF ON FIGCAPTION");
                }
            }
            i++;
        });
        end.push(i);

        // Reverse loop because slice() return the original object
        for (let index = start.length - 1; index >= 0; index--) {
            $(this).children().slice(start[index], end[index]).wrapAll($("<figure>").addClass("img"));
        }
        $(this).children("figure").addClass("img");
    });
}