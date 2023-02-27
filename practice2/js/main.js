let eventBus = new Vue()

Vue.component('column', {
    // колонки
    template: `
 <section id="main" class="main-alt">
 
        <div class="columns">
            <addCard></addCard>
        <p class="error" v-for="error in errors">{{ error }}</p>
                <column_1 :column_1="column_1"></column_1>
                <column_2 :column_2="column_2"></column_2>
                <column_3 :column_3="column_3"></column_3>
            </div>
 </section>
    `,
    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }
    },
    mounted() {
        // создание заметки
        eventBus.$on('addColumn_1', ColumnCard => {

            if (this.column_1.length < 3) {
                this.errors.length = 0
                this.column_1.push(ColumnCard)
            } else {
                this.errors.length = 0
                this.errors.push('макс коллво заметок в 1 столбце')
            }
                })

        eventBus.$on('addColumn_2', ColumnCard => {
            if (this.column_2.length < 5) {
                this.errors.length = 0
                this.column_2.push(ColumnCard)
                this.column_1.splice(this.column_1.indexOf(ColumnCard), 1)
            } else {
                this.errors.length = 0
                this.errors.push('Вы не можете редактировать первую колонку, пока во второй есть 5 карточек.')
            }
        })
        eventBus.$on('addColumn_3', ColumnCard => {
            if (this.column_2.length === 5) {
                this.errors.length = 0
                this.column_3.push(ColumnCard)
                this.column_2.splice(this.column_2.indexOf(ColumnCard), 1)
            } else {
                this.errors.length = 0
                this.errors.push('шлепа')
            }
        })
    }
})

Vue.component('addCard', {
    template: `
    <section id="main" class="main-alt">
    
        <form class="" @submit.prevent="Submit">
        
            <p class="main">Заметки</p>
            
        <div class="form-main">
                
            <div class="form__name">
                <input required type="text" id="name" placeholder="Введите название заметки"/>
            </div>
            
            <input type="text" id="point point__1" v-model="point_1" placeholder="Первый пункт"/>
            <input type="text" id="point point__2" v-model="point_2" placeholder="Второй пункт"/>
            <input type="text" id="point point__3" v-model="point_3" placeholder="Третий пункт"/> 
        </div>
        
            <div class="minus_plus">
                 
                   <p class="plus">
                        <button type='button' @click="addnote"> + </button>
                   </p>
                   
            </div>
            
            <div>                    
                <p class="sub">
                        <input type="submit" value="Отправить"> 
                </p>
            </div>
        </div>
            <div class="form__control">
                <button class="btn">Отправить</button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            name: null,
            point_1: null,
            point_2: null,
            point_3: null,
            point_4: null,
            point_5: null,
            date: null,
            errors: [],
        }
    },
    methods: {
        addnote() {
            if (this.point_4 === null) {
                this.point_4 = true
            }
        },
        Submit() {
            let card = {
                name: this.name,
                points: [{name: this.point_1,},
                    {name: this.point_2,},
                    {name: this.point_3,},
                    {name: this.point_4,},
                    {name: this.point_5,}],
                date: this.date,
                // date: null,
                status: 0,
                // errors: [],
            }
            eventBus.$emit('addColumn_1', card)
            this.name = null;
            this.point_1 = null
            this.point_2 = null
            this.point_3 = null
            this.point_4 = null
            this.point_5 = null
        },

            // if (this.point_4 === true) {
            //     return this.point_5 = null
            // }

        },
        // removenote() {
        //
        //     if (this.point_5 === true) {
        //         return  this.point_5 = false
        //     }
        //
        //     if (this.point_4 === true) {
        //         return  this.point_4 = false
        //     }
        }


)





let app = new Vue({
    el: '#app',
})
