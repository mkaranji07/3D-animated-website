function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco()
// SECTION2
var clutter = "";

document.querySelector(".section2>h1").textContent.split("").forEach(function (dets) {
    clutter += `<span>${dets}</span>`

    document.querySelector(".section2>h1").innerHTML = clutter;
})

gsap.to(".section2>h1>span", {
    scrollTrigger: {
        trigger: `.section2>h1>span`,
        start: `top bottom`, // when the top of the trigger hits the bottom of the viewport
        end: `+=400`, // end after scrolling 400px beyond the start
        scroller: `#main`,
        // markers:true,
        scrub: 0.5,// smooth scrubbing, takes .5 second to "catch up" to the scrollbar
    },
    stagger: 0.2,
    color: `#fff`
})

// PAGE-3-CANVAS
function canvas() {
    const canvas = document.querySelector("#page-3>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
  ./Assets/pngs/frames (1).png
  ./Assets/pngs/frames (2).png
  ./Assets/pngs/frames (3).png
  ./Assets/pngs/frames (4).png
  ./Assets/pngs/frames (5).png
  ./Assets/pngs/frames (6).png
  ./Assets/pngs/frames (7).png
  ./Assets/pngs/frames (8).png
  ./Assets/pngs/frames (9).png
  ./Assets/pngs/frames (10).png
  ./Assets/pngs/frames (11).png
  ./Assets/pngs/frames (12).png
  ./Assets/pngs/frames (13).png
  ./Assets/pngs/frames (14).png
  ./Assets/pngs/frames (15).png
  ./Assets/pngs/frames (16).png
  ./Assets/pngs/frames (17).png
  ./Assets/pngs/frames (18).png
  ./Assets/pngs/frames (19).png
  ./Assets/pngs/frames (20).png
  ./Assets/pngs/frames (21).png
  ./Assets/pngs/frames (22).png
  ./Assets/pngs/frames (23).png
  ./Assets/pngs/frames (24).png
  ./Assets/pngs/frames (25).png
  ./Assets/pngs/frames (26).png
  ./Assets/pngs/frames (27).png
  ./Assets/pngs/frames (28).png
  ./Assets/pngs/frames (29).png
  ./Assets/pngs/frames (30).png
  ./Assets/pngs/frames (31).png
  ./Assets/pngs/frames (32).png
  ./Assets/pngs/frames (33).png
  ./Assets/pngs/frames (34).png
  ./Assets/pngs/frames (35).png
  ./Assets/pngs/frames (36).png
  ./Assets/pngs/frames (37).png
  ./Assets/pngs/frames (38).png
  ./Assets/pngs/frames (39).png
  ./Assets/pngs/frames (40).png
  ./Assets/pngs/frames (41).png
  ./Assets/pngs/frames (42).png
  ./Assets/pngs/frames (43).png
  ./Assets/pngs/frames (44).png
  ./Assets/pngs/frames (45).png
  ./Assets/pngs/frames (46).png
  ./Assets/pngs/frames (47).png
  ./Assets/pngs/frames (48).png
  ./Assets/pngs/frames (49).png
  ./Assets/pngs/frames (50).png
  ./Assets/pngs/frames (51).png
  ./Assets/pngs/frames (52).png
  ./Assets/pngs/frames (53).png
  ./Assets/pngs/frames (54).png
  ./Assets/pngs/frames (55).png
  ./Assets/pngs/frames (56).png
  ./Assets/pngs/frames (57).png
  ./Assets/pngs/frames (58).png
  ./Assets/pngs/frames (59).png
  ./Assets/pngs/frames (60).png
  ./Assets/pngs/frames (61).png
  ./Assets/pngs/frames (62).png
  ./Assets/pngs/frames (63).png
  ./Assets/pngs/frames (64).png
  ./Assets/pngs/frames (65).png
  ./Assets/pngs/frames (66).png
 `;
        return data.split("\n")[index];
    }

    const frameCount = 66;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page-3`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: "#page-3",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas()

// PAGE-4
var clutter = "";

document.querySelector("#page-4>h1").textContent.split("").forEach(function (dets) {
    clutter += `<span>${dets}</span>`

    document.querySelector("#page-4>h1").innerHTML = clutter;
})

gsap.to("#page-4>h1>span", {
    scrollTrigger: {
        trigger: `#page-4>h1>span`,
        start: `top bottom`, // when the top of the trigger hits the bottom of the viewport
        end: `+=400`, // end after scrolling 400px beyond the start
        scroller: `#main`,
        // markers:true,
        scrub: 0.5,// smooth scrubbing, takes .5 second to "catch up" to the scrollbar
    },
    stagger: 0.2,
    color: `#fff`
})

// PAGE-5-CANVAS 
function canvas1() {
    const canvas = document.querySelector("#page-5>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
  ./Assets/pngs/bridges (1).png
  ./Assets/pngs/bridges (2).png
  ./Assets/pngs/bridges (3).png
  ./Assets/pngs/bridges (4).png
  ./Assets/pngs/bridges (5).png
  ./Assets/pngs/bridges (6).png
  ./Assets/pngs/bridges (7).png
  ./Assets/pngs/bridges (8).png
  ./Assets/pngs/bridges (9).png
  ./Assets/pngs/bridges (10).png
  ./Assets/pngs/bridges (11).png
  ./Assets/pngs/bridges (12).png
  ./Assets/pngs/bridges (13).png
  ./Assets/pngs/bridges (14).png
  ./Assets/pngs/bridges (15).png
  ./Assets/pngs/bridges (16).png
  ./Assets/pngs/bridges (17).png
  ./Assets/pngs/bridges (18).png
  ./Assets/pngs/bridges (19).png
  ./Assets/pngs/bridges (20).png
  ./Assets/pngs/bridges (21).png
  ./Assets/pngs/bridges (22).png
  ./Assets/pngs/bridges (23).png
  ./Assets/pngs/bridges (24).png
  ./Assets/pngs/bridges (25).png
  ./Assets/pngs/bridges (26).png
  ./Assets/pngs/bridges (27).png
  ./Assets/pngs/bridges (28).png
  ./Assets/pngs/bridges (29).png
  ./Assets/pngs/bridges (30).png
  ./Assets/pngs/bridges (31).png
  ./Assets/pngs/bridges (32).png
  ./Assets/pngs/bridges (33).png
  ./Assets/pngs/bridges (34).png
  ./Assets/pngs/bridges (35).png
  ./Assets/pngs/bridges (36).png
  ./Assets/pngs/bridges (37).png
  ./Assets/pngs/bridges (38).png
  ./Assets/pngs/bridges (39).png
  ./Assets/pngs/bridges (40).png
  ./Assets/pngs/bridges (41).png
  ./Assets/pngs/bridges (42).png
  ./Assets/pngs/bridges (43).png
  ./Assets/pngs/bridges (44).png
  ./Assets/pngs/bridges (45).png
  ./Assets/pngs/bridges (46).png
  ./Assets/pngs/bridges (47).png
  ./Assets/pngs/bridges (48).png
  ./Assets/pngs/bridges (49).png
  ./Assets/pngs/bridges (50).png
  ./Assets/pngs/bridges (51).png
  ./Assets/pngs/bridges (52).png
  ./Assets/pngs/bridges (53).png
  ./Assets/pngs/bridges (54).png
 `;
        return data.split("\n")[index];
    }

    const frameCount = 56;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page-5`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: "#page-5",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas1()

//PAGE-6
var clutter = "";

document.querySelector("#page-6>h1").textContent.split("").forEach(function (dets) {
    clutter += `<span>${dets}</span>`

    document.querySelector("#page-6>h1").innerHTML = clutter;
})

gsap.to("#page-6>h1>span", {
    scrollTrigger: {
        trigger: `#page-6>h1>span`,
        start: `top bottom`, // when the top of the trigger hits the bottom of the viewport
        end: `+=400`, // end after scrolling 400px beyond the start
        scroller: `#main`,
        // markers:true,
        scrub: 0.5,// smooth scrubbing, takes .5 second to "catch up" to the scrollbar
    },
    stagger: 0.2,
    color: `#fff`
})

//PAGE-7
function canvas2() {
    const canvas = document.querySelector("#page-7>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2



 `;
        return data.split("\n")[index];
    }

    const frameCount = 136;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `#page-7`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: "#page-7",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas2()

//Percentage Circle 
gsap.to(".page-7-cir", {
    scrollTrigger:{
        trigger: `.page-7-cir`,
        start:`top center`,  // when the top of the trigger hits the center of the viewport
        end: `bottom top`, // When the bottom of the trigger hits the top of the viewport
        // markers: true,
        scroller: `#main`,
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
    scale: 2.5
})


gsap.to(".page-7-cir-inner", {
    scrollTrigger:{
        trigger: `.page-7-cir-inner`,
        start:`top center`,  // when the top of the trigger hits the center of the viewport
        end: `bottom top`, //  When the bottom of the trigger hits the top of the viewport
        // markers: true,
        scroller: `#main`,
        scrub: 1, // smooth scrubbing, takes .5 second to "catch up" to the scrollbar
    },
    backgroundColor : `#0a3bce91`,
})


