import LocalStorageService from "@/services/localStorage.service";

export default {
  state: {
    folders: LocalStorageService.getArray('folders'),
  },
  getters: {
    folders: (state) => state.folders,
  },
  mutations: {
    setFolders(state, folders) {
      state.folders = folders;
      LocalStorageService.setObject('folders', folders);
    },
    addFolder(state, folder) {
      state.folders.push({ ...folder, id: Date.now(), expenses: [] });
      LocalStorageService.setObject('folders', state.folders);
    },
    updateFolder(state, folder) {
      state.folders.forEach((item) => {
        if (item.id === folder.id) {
          item.name = folder.name;
        }
      });
      LocalStorageService.setObject('folders', state.folders);
    },
    deleteFolder(state, id) {
      state.folders = state.folders.filter((item) => item.id !== id);
      LocalStorageService.setObject('folders', state.folders);
    },
  },
  actions: {
    addFolder({ commit }, folder) {
      commit('addFolder', folder);
    },
    updateFolder({ commit }, folder) {
      commit('updateFolder', folder);
    },
    deleteFolder({ commit }, id) {
      commit('deleteFolder', id);
    },
  }
}
