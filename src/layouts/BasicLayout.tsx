/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useIntl, connect, Dispatch, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import {getQueryObject} from '@/utils/utils';
import {TableOutlined} from '@ant-design/icons';
import logo from '../assets/logo.svg';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

// [{"path":"/","redirect":"/welcome","exact":true,"locale":false,"key":"/5d3454cb2835f1a1148c5156506871e799297eb8da8e4b66402dd2ae0520f943","routes":null,"pro_layout_parentKeys":[]},{"path":"/welcome","name":"欢迎","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"component":{"displayName":"LoadableComponent"},"exact":true,"locale":"menu.welcome","key":"/welcome","routes":null,"pro_layout_parentKeys":[]},{"path":"/admin","name":"管理页","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"component":{"displayName":"LoadableComponent"},"authority":["admin"],"routes":null,"children":[{"path":"/admin/sub-page","name":"二级管理页","component":{"displayName":"LoadableComponent"},"authority":["admin"],"routes":null,"locale":"menu.admin.sub-page","key":"/admin/sub-page","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"exact":true,"pro_layout_parentKeys":["/admin"]}],"locale":"menu.admin","key":"/admin","pro_layout_parentKeys":[]},{"path":"/list","name":"查询表格","icon":{"type":{},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}},"component":{"displayName":"LoadableComponent"},"exact":true,"locale":"menu.list.table-list","key":"/list","routes":null,"pro_layout_parentKeys":[]}]

const fakeMenuList = [
  {
    role_id: 154,
    level: 0,
    node_id: 3391,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3391,
    group: 'Admin',
    module: '/',
    action: '',
    title: '首页',
    status: 1,
    post_type: '',
    sort: 11,
    pid: 0,
    params: 'hideInMenu=true&icon=smile&redirect=/',
    remark: '',
    children: [],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3447,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3447,
    group: 'Admin',
    module: '/label_management',
    action: 'menu.label_management',
    title: '标签管理',
    status: 1,
    post_type: '',
    sort: 10,
    pid: 0,
    params: '',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3448,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3448,
        group: 'Admin',
        module: '/label_management/user_label',
        action: 'menu.label_management.user_label',
        title: '用户标签',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3447,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3451,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3451,
        group: 'Admin',
        module: '/label_management/group_list',
        action: 'menu.label_management.group_list',
        title: '人群列表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3447,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3489,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3489,
        group: 'Admin',
        module: '/label_management/group_users',
        action: 'menu.label_management.group_users',
        title: '查看用户',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3447,
        params: '',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3483,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3483,
    group: 'Admin',
    module: '/abtest',
    action: 'menu.abtest',
    title: 'abtest实验',
    status: 1,
    post_type: '',
    sort: 9,
    pid: 0,
    params: '',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3484,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3484,
        group: 'Admin',
        module: '/abtest/list',
        action: 'menu.abtest.list',
        title: '实验列表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3483,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3420,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3420,
    group: 'Admin',
    module: '/msg_template',
    action: 'menu.msg_template',
    title: '消息模板',
    status: 1,
    post_type: '',
    sort: 8,
    pid: 0,
    params: 'icon=table',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3484,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3484,
        group: 'Admin',
        module: '/msg_template/message',
        action: 'menu.msg_template.message',
        title: 'Message',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3483,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3484,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3484,
        group: 'Admin',
        module: '/msg_template/web_notification',
        action: 'menu.msg_template.notification',
        title: 'WebNotification',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3483,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3484,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3484,
        group: 'Admin',
        module: '/msg_template/system_push',
        action: 'menu.msg_template.system',
        title: '系统推送',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3483,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3492,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3492,
    group: 'Admin',
    module: '/msg_push',
    action: 'menu.msg_push',
    title: '消息推送',
    status: 1,
    post_type: '',
    sort: 7,
    pid: 0,
    params: 'icon=table',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/msg_push/list',
        action: 'menu.msg_push.list',
        title: '推送任务列表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3481,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3481,
    group: 'Admin',
    module: '/user_push_record',
    action: 'menu.user_push_record',
    title: '用户推送记录',
    status: 1,
    post_type: '',
    sort: 0,
    pid: 0,
    params: '',
    remark: '',
    children: [],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3482,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3482,
    group: 'Admin',
    module: '/data_report',
    action: 'menu.data_report',
    title: '数据报表',
    status: 1,
    post_type: '',
    sort: 0,
    pid: 0,
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/data_report/push_effect',
        action: 'menu.data_report.push_effect',
        title: '推送效果报表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/data_report/abtest',
        action: 'menu.data_report.abtest',
        title: 'abtest效果报表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/data_report/push_stable',
        action: 'menu.data_report.push_stable',
        title: '推送稳定性报表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/data_report/hour',
        action: 'menu.data_report.hour',
        title: '推送分时趋势图',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/data_report/day',
        action: 'menu.data_report.day',
        title: '推送分天趋势图',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3540,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3540,
    group: 'Admin',
    module: '/blackwhite',
    action: 'menu.blackwhite',
    title: '黑白名单库',
    status: 1,
    post_type: '',
    sort: 0,
    pid: 0,
    params: '',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/blackwhite/test_white',
        action: 'menu.blackwhite.test_white',
        title: '测试白名单',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/blackwhite/email_unsubsribe_black',
        action: 'menu.blackwhite.email_unsubsribe_black',
        title: '邮箱退订黑名单',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/blackwhite/messenger_unsubsribe_black',
        action: 'menu.blackwhite.messenger_unsubsribe_black',
        title: 'messenger退订黑名单',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3540,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3540,
    group: 'Admin',
    module: '/system_setting',
    action: 'menu.system_setting',
    title: '系统设置',
    status: 1,
    post_type: '',
    sort: 0,
    pid: 0,
    params: '',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/system_setting/email_account_management',
        action: 'menu.system_setting.email_account_management',
        title: '邮箱账号管理',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/system_setting/messenger_ads_management',
        action: 'menu.system_setting.messenger_ads_management',
        title: 'messenger广告位管理',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/system_setting/product_site_management',
        action: 'menu.system_setting.product_site_management',
        title: '产品/站点管理',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/system_setting/access_management',
        action: 'menu.system_setting.access_management',
        title: '接入管理',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
  {
    role_id: 154,
    level: 0,
    node_id: 3540,
    siteid: 59,
    bussiness: 37,
    request_method: 0,
    type: 2,
    actions: '',
    id: 3540,
    group: 'Admin',
    module: '/account_management',
    action: 'menu.account_management',
    title: '账号管理',
    status: 1,
    post_type: '',
    sort: 0,
    pid: 0,
    params: '',
    remark: '',
    children: [
      {
        role_id: 154,
        level: 0,
        node_id: 3392,
        siteid: 59,
        bussiness: 37,
        request_method: 0,
        type: 2,
        actions: '',
        id: 3392,
        group: 'Admin',
        module: '/account_management/list',
        action: 'menu.account_management.list',
        title: '账号列表',
        status: 1,
        post_type: '',
        sort: 0,
        pid: 3492,
        params: 'hideChildrenInMenu=true&icon=table',
        remark: '',
        childs: [],
        children: [],
      },
    ],
  },
];

const formatter = (data: any[], rootPath = '/') => {
  // @ts-ignore
  const routersData = []
  data.forEach(item => {
    // @ts-ignore
    const m: {
      hideChildrenInMenu: any;
      hideInMenu: any;
      target: any;
      redirect: any;
      icon: any;
    } = getQueryObject(item.params)
    let routerInfo = {
      path: rootPath === '/' ? `${rootPath}${item.module}` : `/${rootPath}/${item.module}`,
      locale: item.action,
      name: item.title,
      icon: <TableOutlined/>,
    }
    if (item.childs && item.childs.length > 0) {
      // @ts-ignore
      routerInfo = {...routerInfo, children: formatter(item.childs, item.module)}
    }
    if (item.params) {
      routerInfo = {
        ...routerInfo,
        icon: m.icon,
        // @ts-ignore
        redirect: m.redirect,
        target: m.target,
        hideInMenu: m.hideInMenu,
        hideChildrenInMenu: m.hideChildrenInMenu
      }
    }
    if (routerInfo.icon) {
      const {icon} = routerInfo;
      if (icon) {
        try {
          routerInfo.icon = <TableOutlined/>
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    }
    routersData.push(routerInfo)
  })
  // @ts-ignore
  return routersData
};

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
menuList.map((item) => {
    console.log(menuList);
    sessionStorage.setItem('menuList', JSON.stringify(menuList));
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);
  const [menuData = [], setMenuData] = useState<any>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
    setMenuData(formatter(fakeMenuList));
    if (window.__POWERED_BY_QIANKUN__) {
      document.querySelector("aside.ant-layout-sider").style['margin-left'] = '172px';
    }
  }, []);

  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      // menuDataRender={() => {
      //   return menuData;
      // }}

      rightContentRender={() => <RightContent />}
      // postMenuData={(menuData) => {
      //   console.log(menuData);
      //   menuDataRef.current = menuData || [];
      //   return menuData || [];
      // }}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
