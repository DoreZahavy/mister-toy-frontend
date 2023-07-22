import { toyService } from "@/services/toy.service.js";

export const toyStore = {
  strict: true,
  state() {
    return {
      toys: [],
      maxPageCount: 1,
      chartData: {},
      filterBy: {
        sortDir: 1,
        sortBy: '',
        name: '',
        stock: '',
        labels: [],
        pageIdx: 0
      },
    }
  },
  getters: {
    toys({ toys }) {
      return toys;
    },
    maxPageCount({ maxPageCount }) {
      return maxPageCount
    },
    pageIdx({ filterBy }) {
      return filterBy.pageIdx
    },
    chartData({ chartData }) {
      var dataForChart = {
        labels: [], datasets: [
          {
            backgroundColor: ['#e30022', '#00cc66', '#ffa000', '#00aeff', '#ff3800', '#e1fcad', '#d30bd3', '#df66bb', '#7d7c80'],
            data: []
          }
        ]
      }
      for (const label in chartData) {
        dataForChart.labels.push(label)
        dataForChart.datasets[0].data.push(chartData[label])
      }
      console.log('dataForChart:', dataForChart)
      return dataForChart
    }
  },

  mutations: {
    setToys(state, { res }) {
      state.maxPageCount = res.maxPageCount
      state.chartData = res.chartData;
      state.toys = res.toys;
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId);
      state.toys.splice(idx, 1);
    },
    addToy(state, { toy }) {
      state.toys.push(toy)
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(t => t._id === toy._id);
      state.toys[idx] = toy
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    changePage({ filterBy }, { dir }) {
      filterBy.pageIdx = filterBy.pageIdx + dir
    },
    sortDir({ filterBy }, { sort }) {
      filterBy.sortDir = (filterBy.sortBy === sort) ? filterBy.sortDir * -1 : 1
    }
  },

  actions: {
    async loadToys(context) {
      try {
        const res = await toyService.query(context.state.filterBy)
        return context.commit({ type: "setToys", res })
      } catch {
        console.log(err)
        return Promise.reject()
      }
    },

    async removeToy({ commit }, { toyId }) {
      try {
        const res = await toyService.remove(toyId)
        commit({ type: "removeToy", toyId })
        return Promise.resolve()
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    async saveToy({ dispatch }, { toyToSave }) {
      try {
        const savedToy = await toyService.save(toyToSave)
        // if (toyToSave._id) {
        //   commit({ type: "updateToy", toy: savedToy })
        // } else {
        //   commit({ type: "addToy", toy: savedToy })
        // }
        dispatch({ type: "loadToys" })
        return savedToy
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },

    sortDir(context, { sort }) {
      context.commit({ type: "sortDir", sort })
      context.dispatch({ type: "loadToys" })
    },

    setFilter(context, { filterBy }) {
      context.commit({ type: "setFilter", filterBy })
      context.dispatch({ type: "loadToys" })
    },

    changePage(context, { dir }) {
      if (context.state.filterBy.pageIdx + dir < 0) return
      if (context.state.filterBy.pageIdx + dir > this.maxPageCount) return
      context.commit({ type: "changePage", dir })
      context.dispatch({ type: "loadToys" })
    }
  },
}
