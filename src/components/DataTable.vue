<template>
  <div class="data-table">
    <div class="toolbar" v-if="showToolbar">
      <slot name="toolbar"></slot>
    </div>

    <el-table
      class="table"
      :data="data"
      :row-style="rowStyle"
      :border="border"
      :stripe="stripe"
      :height="height"
      :highlight-current-row="highlightCurrentRow"
      @current-change="handleCurrentChange"
      @row-click="handleRowClick">
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="index"
          :type="column.type"
          :prop="column.name"
          :label="column.title"
          :width="column.width"
          :align="column.align"
          v-if="column.name && column.name.startsWith('__slot:')"
        >
          <template slot-scope="scope">
            <slot :row="scope.row" :name="column.name.replace('__slot:', '')"></slot>
          </template>
        </el-table-column>

        <el-table-column
          :key="index"
          :render-header="column.renderHeader"
          :type="column.type"
          :prop="column.name"
          :label="column.title"
          :width="column.width"
          :align="column.align"
          :formatter="column.type === 'date' || column.type === 'datetime' ? strftime : null"
          v-else
        ></el-table-column>
      </template>
    </el-table>

    <div class="bottom-bar" v-if="showBottomBar">
      <div class="left">
        <slot name="bottom-left-bar"></slot>
      </div>
      <div class="right">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :pager-count="pagerCount"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @size-change="$emit('page-size-change', $event)"
          @current-change="$emit('page-change', $event)"
          @prev-click="$emit('page-change', $event)"
          @next-click="$emit('page-change', $event)"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DataTable',

  props: {
    columns: {
      type: Array,
      default () { return [] }
    },

    data: {
      type: Array,
      default () { return [] }
    },

    border: {
      type: Boolean,
      default: false
    },

    stripe: {
      type: Boolean,
      default: false
    },

    height: {
      // type: Number,
      default: 200
    },

    highlightCurrentRow: {
      type: Boolean,
      default: false
    },

    showBottomBar: {
      type: Boolean,
      default: true
    },

    total: {
      type: Number,
      default: 0
    },

    pageSize: {
      type: Number,
      default: 20
    },

    currentPage: {
      type: Number,
      default: 1
    },

    pagerCount: {
      type: Number,
      default: 7
    },
    rowStyle: {
      type:Function,
    },
    rowClick: {
      type: Boolean,
      default: false
    },
    showToolbar: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    handleCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },

    handleRowClick (row, column, event) {
      if (this.rowClick) {
        this.$emit('row-click', row)
      }
    },

    strftime (row, column, cellValue) {
      if (!cellValue) return ''

      if (column.type === 'date') {
        return dayjs(cellValue).format('YYYY-MM-DD')
      } else if (column.type === 'datetime') {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
      } else {
        return cellValue
      }
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.data-table {
  display: flex;
  flex-direction: column;
  .table {
    flex: 1;
    width: 100%;
    border-left-width: 0;

    .table-actions .el-button--text {
      padding-top: 0;
      padding-bottom: 0;

      &.warn {
        color: #f56c6c;
        &:hover {
          color: #f78989;
        }
        &:active {
          color: #f56c6c;
        }
      }
    }

    .cell {
      text-align: center;
    }
  }

  .bottom-bar {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px 6px 15px;
  }
}
</style>
