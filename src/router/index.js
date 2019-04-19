import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/admin/index'
import ManageAdmin from '@/pages/admin/manageAdmin/manageAdmin'
import ManageList from '@/pages/admin/manageAdmin/components/manageList'
import scoreAll from '@/pages/admin/manageAdmin/components/scoreAll'
import SchoolList from '@/pages/admin/manageAdmin/components/schoolList'
import AdministratorsList from '@/pages/admin/manageAdmin/components/administratorsList'
import achievement from '@/pages/admin/manageAdmin/components/achievement'
import entryrecord from '@/pages/admin/manageAdmin/components/entryrecord'
import userInfo from '@/pages/admin/userinfo'
import IBOXList from '@/pages/admin/manageAdmin/components/IBOXList'
import iboxDetail from '@/pages/admin/manageAdmin/monitor'
// import IBOXList from '@/pages/admin/manageAdmin/components/IBOXList'
// import CourseList from '@/pages/admin/manageAdmin/components/CourseList'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/manageAdmin',
      name: 'ManageAdmin',
      component: ManageAdmin,
      redirect: '/manageAdmin/manageList',
      children: [
        {
          path: 'iboxdetail',
          name: 'iboxdetail',
          component: iboxDetail
        },
        {
          path: 'entryrecord',
          name: 'entryrecord',
          component: entryrecord
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: userInfo
        },
        {
          path: 'scoreAll',
          name: 'scoreAll',
          component: scoreAll
        },
        {
          path: 'manageList',
          name: 'ManageList',
          component: ManageList
        },
        {
          path: 'schoolList',
          name: 'SchoolList',
          component: SchoolList
        },
        {
          path: 'administratorsList',
          name: 'AdministratorsList',
          component: AdministratorsList
        },
        {
          path: 'achievement',
          name: 'achievement',
          component: achievement
        },
        {
          path: 'iboxList',
          name: 'IBOXList',
          component: IBOXList
        },
        // {
        //   path: 'courseList',
        //   name: 'CourseList',
        //   component: CourseList
        // }
      ]
    }
  ]
})
