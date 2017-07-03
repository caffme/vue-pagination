module.exports = {
    template: '<nav>'+"\n"+
'        <ul class="pagination" v-if="pagination.last_page > 0" :class="sizeClass">'+"\n"+
'            <li v-if="showPrevious()" :class="{ \'disabled\' : pagination.current_page <= 1 }">'+"\n"+
'                <span v-if="pagination.current_page <= 1">'+"\n"+
'                    <span aria-hidden="true">{{ config.previousText }}</span>'+"\n"+
'                </span>'+"\n"+
"\n"+
'                <a href="#" v-if="pagination.current_page > 1 " :aria-label="config.ariaPrevioius" @click.prevent="changePage(pagination.current_page - 1)">'+"\n"+
'                    <span aria-hidden="true">{{ config.previousText }}</span>'+"\n"+
'                </a>'+"\n"+
'            </li>'+"\n"+
"\n"+
'            <li v-for="num in array" :class="{ \'active\': num === pagination.current_page }">'+"\n"+
'                <a href="#" @click.prevent="changePage(num)">{{ num }}</a>'+"\n"+
'            </li>'+"\n"+
"\n"+
'            <li v-if="showNext()" :class="{ \'disabled\' : pagination.current_page === pagination.last_page || pagination.last_page === 0 }">'+"\n"+
'                <span v-if="pagination.current_page === pagination.last_page || pagination.last_page === 0">'+"\n"+
'                    <span aria-hidden="true">{{ config.nextText }}</span>'+"\n"+
'                </span>'+"\n"+
"\n"+
'                <a href="#" v-if="pagination.current_page < pagination.last_page" :aria-label="config.ariaNext" @click.prevent="changePage(pagination.current_page + 1)">'+"\n"+
'                    <span aria-hidden="true">{{ config.nextText }}</span>'+"\n"+
'                </a>'+"\n"+
'            </li>'+"\n"+
'        </ul>'+"\n"+
'    </nav>',

    props: {
        pagination: {
            type: Object,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
        options: {
            type: Object
        },
        size: {
            type: String
        }
    },
    computed: {
        array: function () {
            if (this.pagination.last_page <= 0) {
                return [];
            }

            let from = this.pagination.current_page - this.config.offset;
            if (from < 1) {
                from = 1;
            }

            let to = from + (this.config.offset * 2);
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }

            let arr = [];
            while (from <=to) {
                arr.push(from);
                from++;
            }

            return arr;
        },
        config: function () {
            return Object.assign({
                offset: 3,
                ariaPrevious: 'Previous',
                ariaNext: 'Next',
                previousText: '«',
                nextText: '»',
                alwaysShowPrevNext: false
            }, this.options);
        },
        sizeClass: function () {
            if (this.size === 'large') {
                return 'pagination-lg';
            } else if(this.size === 'small') {
                return 'pagination-sm';
            } else {
                return '';
            }
        }
    },
    watch: {
        'pagination.per_page': function (newVal, oldVal) {
            if (+newVal !== +oldVal) {
                this.callback();
            }
        }
    },
    methods: {
        showPrevious: function () {
            return this.config.alwaysShowPrevNext || this.pagination.current_page > 1;
        },
        showNext: function () {
            return this.config.alwaysShowPrevNext || this.pagination.current_page < this.pagination.last_page;
        },
        changePage: function (page) {
            if (this.pagination.current_page === page) {
                return;
            }

            this.$set(this.pagination, 'current_page', page);
            this.callback();
        }
    }
};
