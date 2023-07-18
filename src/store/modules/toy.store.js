import { toyService } from "@/services/toy.service.js";

export const toyStore = {
  strict: true,
  state() {
    return {
      toys: [],
      maxPageCount: 1,

      filterBy: { sortDir: 1, sortBy: '', name: '', stock: '', labels: [], pageIdx: 0 },

    };
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
    }
  },
  mutations: {
    setToys(state, { res }) {
      state.maxPageCount = res.maxPageCount
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

    loadToys(context) {
      return toyService
        .query(context.state.filterBy)
        .then(res => {
          return context.commit({ type: "setToys", res })
        })
        .catch(err => {
          console.log(err);
          return Promise.reject();
        })
    },
    removeToy({ commit }, { toyId }) {
      return toyService
        .remove(toyId)
        .then(() => commit({ type: "removeToy", toyId }))
        .catch((err) => {
          console.log(err);
          return Promise.reject();
        });
    },
    saveToy({ commit }, { toyToSave }) {

      return toyService 
        .save(toyToSave)
        .then(savedToy => {
          if (toyToSave._id) {
            commit({ type: "updateToy", toy: savedToy })
          } else {
            commit({ type: "addToy", toy: savedToy })
          }
          // this.$router.push('/toy')
        })
        .catch(err => {
          console.log(err);
          return Promise.reject();
        })
    },
    sortDir(context, { sort }) {
      context.commit({ type: "sortDir", sort })
      context.dispatch({ type: "loadToys" })
    },

    setFilter(context, { filterBy }) {
      context.commit({ type: "setFilter", filterBy })

      context.dispatch({ type: "loadToys" })
      // context.state.filterBy = filterBy
    },
    changePage(context, { dir }) {
      if (context.state.filterBy.pageIdx + dir < 0) return
      if (context.state.filterBy.pageIdx + dir > this.maxPageCount) return
      context.commit({ type: "changePage", dir })
      context.dispatch({ type: "loadToys" })


    }

  },
};
