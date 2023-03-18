/*
порядок применения стилей
1) Стиль вписанный в элемент html
2) Стиль считанный в id
3) Стиль считанный в class
4) !
5) *
TODO: Разобраться в порядке применения стилей
*/

const ladder = document.getElementById("rodia_ti_zloy")
const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF', '#4DB3FF'];

function fifty_spartans(ladder, n) {
    const heights = []
    for (i = 0 ; i < n; i ++) {
        heights[i] = 10 + i*2.8
    }                  
    
    for (i = 1; i < n+1; i++) {
        let box = document.createElement("div")
        column = ladder.insertAdjacentElement("beforeend", box)
        
        column.setAttribute("id","col_" + i)
        column.style.backgroundColor = colorArray[(i-1) % colorArray.length] //от 0 до colorArray.length-1
        column.style.height = heights[i-1]
    }
}

// 24 разделить нацело на 50 == 0*50 + 24
// 0 разделить нацело на 50 == 0*50 + 0
// 48 разделить нацело на 50 == 0*50 + 48
// 51 разделить нацело на 50 == 1*50

fifty_spartans(ladder, 60)
