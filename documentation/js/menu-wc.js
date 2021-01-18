'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">formsz-migration documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdministratorsModule.html" data-type="entity-link">AdministratorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' : 'data-target="#xs-components-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' :
                                            'id="xs-components-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' }>
                                            <li class="link">
                                                <a href="components/AdministratorCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdministratorDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdministratorEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdministratorListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdministratorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' : 'data-target="#xs-injectables-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' :
                                        'id="xs-injectables-links-module-AdministratorsModule-3370f31cbacaf855ec64fed94b7666f4"' }>
                                        <li class="link">
                                            <a href="injectables/AdministratorServiceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdministratorServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdministratorsRoutingModule.html" data-type="entity-link">AdministratorsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' : 'data-target="#xs-components-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' :
                                            'id="xs-components-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' : 'data-target="#xs-injectables-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' :
                                        'id="xs-injectables-links-module-AppModule-86377fc1a940a4128f3781108e9a70b7"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ServerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ApprovalsModule.html" data-type="entity-link">ApprovalsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ApprovalsModule-6cffef66244c487129ca3051a9710d7e"' : 'data-target="#xs-components-links-module-ApprovalsModule-6cffef66244c487129ca3051a9710d7e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ApprovalsModule-6cffef66244c487129ca3051a9710d7e"' :
                                            'id="xs-components-links-module-ApprovalsModule-6cffef66244c487129ca3051a9710d7e"' }>
                                            <li class="link">
                                                <a href="components/ApprovalsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApprovalsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApprovalsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApprovalsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApprovalsWorkAssignmentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApprovalsWorkAssignmentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ApprovalsRoutingModule.html" data-type="entity-link">ApprovalsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AssignmentListModule.html" data-type="entity-link">AssignmentListModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AsynDownloadsModule.html" data-type="entity-link">AsynDownloadsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AsynDownloadsModule-79e3d058350a09b81d6635d4a5788b0d"' : 'data-target="#xs-components-links-module-AsynDownloadsModule-79e3d058350a09b81d6635d4a5788b0d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AsynDownloadsModule-79e3d058350a09b81d6635d4a5788b0d"' :
                                            'id="xs-components-links-module-AsynDownloadsModule-79e3d058350a09b81d6635d4a5788b0d"' }>
                                            <li class="link">
                                                <a href="components/AsynDownloadsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AsynDownloadsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AsynDownloadsRoutingModule.html" data-type="entity-link">AsynDownloadsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link">CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CategoriesModule-081d5a7849e9948a7097c6c22b452af7"' : 'data-target="#xs-components-links-module-CategoriesModule-081d5a7849e9948a7097c6c22b452af7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CategoriesModule-081d5a7849e9948a7097c6c22b452af7"' :
                                            'id="xs-components-links-module-CategoriesModule-081d5a7849e9948a7097c6c22b452af7"' }>
                                            <li class="link">
                                                <a href="components/CategoriesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoriesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryListViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryListViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesRoutingModule.html" data-type="entity-link">CategoriesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChangepasswordModule.html" data-type="entity-link">ChangepasswordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChangepasswordModule-b96a251e49cab09604dd01afd2dd1068"' : 'data-target="#xs-components-links-module-ChangepasswordModule-b96a251e49cab09604dd01afd2dd1068"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChangepasswordModule-b96a251e49cab09604dd01afd2dd1068"' :
                                            'id="xs-components-links-module-ChangepasswordModule-b96a251e49cab09604dd01afd2dd1068"' }>
                                            <li class="link">
                                                <a href="components/ChangepasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangepasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' : 'data-target="#xs-components-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' :
                                            'id="xs-components-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' }>
                                            <li class="link">
                                                <a href="components/ApiCallResComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApiCallResComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcumbLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcumbLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoModelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoModelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoDataFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoDataFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageLoaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageLoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideBarMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideBarMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WebUserHeaderRightMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebUserHeaderRightMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WebuserHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebuserHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WebuserSideLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WebuserSideLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' : 'data-target="#xs-directives-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' :
                                        'id="xs-directives-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' }>
                                        <li class="link">
                                            <a href="directives/SpecialCharacterDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpecialCharacterDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' : 'data-target="#xs-pipes-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' :
                                            'id="xs-pipes-links-module-ComponentsModule-77022443c4d2bef53f399f149beacee0"' }>
                                            <li class="link">
                                                <a href="pipes/LargeTextElipsePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LargeTextElipsePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardsModule.html" data-type="entity-link">DashboardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' : 'data-target="#xs-components-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' :
                                            'id="xs-components-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' }>
                                            <li class="link">
                                                <a href="components/DashboaardPiechartsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboaardPiechartsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardFeedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardFeedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardTablesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardTablesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' : 'data-target="#xs-directives-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' :
                                        'id="xs-directives-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' }>
                                        <li class="link">
                                            <a href="directives/ToggleFullscreenDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToggleFullscreenDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' : 'data-target="#xs-pipes-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' :
                                            'id="xs-pipes-links-module-DashboardsModule-6c5bb5b930c8a106830fb6122793da7d"' }>
                                            <li class="link">
                                                <a href="pipes/TypeCheckPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TypeCheckPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentsModule.html" data-type="entity-link">DepartmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' : 'data-target="#xs-components-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' :
                                            'id="xs-components-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' }>
                                            <li class="link">
                                                <a href="components/DepartmentCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DepartmentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DepartmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RemoveAdminsUsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RemoveAdminsUsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' : 'data-target="#xs-injectables-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' :
                                        'id="xs-injectables-links-module-DepartmentsModule-287951bd918a52633de5acaa523a72f1"' }>
                                        <li class="link">
                                            <a href="injectables/DepartmentsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DepartmentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentsRoutingModule.html" data-type="entity-link">DepartmentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeviceManagementModule.html" data-type="entity-link">DeviceManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DeviceManagementModule-68e00bbca350acdc3602e0651c6e68f8"' : 'data-target="#xs-components-links-module-DeviceManagementModule-68e00bbca350acdc3602e0651c6e68f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeviceManagementModule-68e00bbca350acdc3602e0651c6e68f8"' :
                                            'id="xs-components-links-module-DeviceManagementModule-68e00bbca350acdc3602e0651c6e68f8"' }>
                                            <li class="link">
                                                <a href="components/DeviceManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeviceManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DevicesDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DevicesDeleteComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeviceManagementRoutingModule.html" data-type="entity-link">DeviceManagementRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DynamicFormModule.html" data-type="entity-link">DynamicFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' : 'data-target="#xs-components-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' :
                                            'id="xs-components-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' }>
                                            <li class="link">
                                                <a href="components/DynamicFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCalculationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCalculationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCheckBoxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCheckBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDropDownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDropDownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormFileUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormFileUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormHeadingBreakComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormHeadingBreakComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormImageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormImageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormImagePreviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormImagePreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormNumberComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormNumberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormRadioButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormRadioButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormRatingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormRatingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTableAddRowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormTableAddRowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTextAreaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormTextAreaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTimeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormTimeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormUserPropertiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormUserPropertiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormVideoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormVideoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VideoPriviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VideoPriviewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' : 'data-target="#xs-directives-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' :
                                        'id="xs-directives-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' }>
                                        <li class="link">
                                            <a href="directives/DynamicFieldDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicFieldDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/OnlynumbersallowDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnlynumbersallowDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' : 'data-target="#xs-injectables-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' :
                                        'id="xs-injectables-links-module-DynamicFormModule-cc3d6e9695e47c583c6151898945fcd3"' }>
                                        <li class="link">
                                            <a href="injectables/FormDataDistributionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FormDataDistributionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DynamicFormModule.html" data-type="entity-link">DynamicFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DynamicFormModule-e5fc0dafc5c29d5a2648287dc6bb0171-1"' : 'data-target="#xs-components-links-module-DynamicFormModule-e5fc0dafc5c29d5a2648287dc6bb0171-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DynamicFormModule-e5fc0dafc5c29d5a2648287dc6bb0171-1"' :
                                            'id="xs-components-links-module-DynamicFormModule-e5fc0dafc5c29d5a2648287dc6bb0171-1"' }>
                                            <li class="link">
                                                <a href="components/CommonFormLabelsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommonFormLabelsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommonFormactionViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommonFormactionViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormBarcodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormBarcodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCalculatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCalculatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCameraComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCameraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormHeaderBreakComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormHeaderBreakComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormMapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormSignatureComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormSignatureComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormLinkModule.html" data-type="entity-link">FormLinkModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormLinkModule-16eaf8750d9dbdbfcb3fd01a38e59a2b"' : 'data-target="#xs-components-links-module-FormLinkModule-16eaf8750d9dbdbfcb3fd01a38e59a2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormLinkModule-16eaf8750d9dbdbfcb3fd01a38e59a2b"' :
                                            'id="xs-components-links-module-FormLinkModule-16eaf8750d9dbdbfcb3fd01a38e59a2b"' }>
                                            <li class="link">
                                                <a href="components/FormExpiredComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormExpiredComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormSuccessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormSuccessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormLinkRoutingModule.html" data-type="entity-link">FormLinkRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormModule.html" data-type="entity-link">FormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormModule-405f41cf3315f91d4f3fd4950c2846ad"' : 'data-target="#xs-components-links-module-FormModule-405f41cf3315f91d4f3fd4950c2846ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormModule-405f41cf3315f91d4f3fd4950c2846ad"' :
                                            'id="xs-components-links-module-FormModule-405f41cf3315f91d4f3fd4950c2846ad"' }>
                                            <li class="link">
                                                <a href="components/FormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitSuccessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubmitSuccessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormsRoutingModule.html" data-type="entity-link">FormsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormszModule.html" data-type="entity-link">FormszModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' : 'data-target="#xs-components-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' :
                                            'id="xs-components-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' }>
                                            <li class="link">
                                                <a href="components/FormCreateModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCreateModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormEditModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormEditModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormImportAsTemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormImportAsTemplateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VersionHistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VersionHistoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' : 'data-target="#xs-injectables-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' :
                                        'id="xs-injectables-links-module-FormszModule-994f1cb2ccd78e55f96d6151ede8a63f"' }>
                                        <li class="link">
                                            <a href="injectables/WindowRef.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WindowRef</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' : 'data-target="#xs-components-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' :
                                            'id="xs-components-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' }>
                                            <li class="link">
                                                <a href="components/AssignmentHistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssignmentHistoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssignmentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AssignmentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkordersListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkordersListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkordersListViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkordersListViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' : 'data-target="#xs-pipes-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' :
                                            'id="xs-pipes-links-module-HomeModule-fbac643eb60750e72a674b4f53edba2c"' }>
                                            <li class="link">
                                                <a href="pipes/DateAgoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DateAgoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link">LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LayoutModule-397210dfcde788018c9379eb0226c08c"' : 'data-target="#xs-components-links-module-LayoutModule-397210dfcde788018c9379eb0226c08c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-397210dfcde788018c9379eb0226c08c"' :
                                            'id="xs-components-links-module-LayoutModule-397210dfcde788018c9379eb0226c08c"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LicenseManagementModule.html" data-type="entity-link">LicenseManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LicenseManagementModule-b58bd4bce69818be0b791d4e4da96e4c"' : 'data-target="#xs-components-links-module-LicenseManagementModule-b58bd4bce69818be0b791d4e4da96e4c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LicenseManagementModule-b58bd4bce69818be0b791d4e4da96e4c"' :
                                            'id="xs-components-links-module-LicenseManagementModule-b58bd4bce69818be0b791d4e4da96e4c"' }>
                                            <li class="link">
                                                <a href="components/LicenseManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LicenseManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LicenseManagementCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LicenseManagementCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LicenseManagementListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LicenseManagementListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LicenseManagementRenewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LicenseManagementRenewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LicenseManagementRoutingModule.html" data-type="entity-link">LicenseManagementRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-167ed7f6087a9d5628dfcbf9a525aa86"' : 'data-target="#xs-components-links-module-LoginModule-167ed7f6087a9d5628dfcbf9a525aa86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-167ed7f6087a9d5628dfcbf9a525aa86"' :
                                            'id="xs-components-links-module-LoginModule-167ed7f6087a9d5628dfcbf9a525aa86"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link">LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MapLocationsModule.html" data-type="entity-link">MapLocationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MapLocationsModule-361525360c3f1eafed739e0642b70055"' : 'data-target="#xs-components-links-module-MapLocationsModule-361525360c3f1eafed739e0642b70055"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MapLocationsModule-361525360c3f1eafed739e0642b70055"' :
                                            'id="xs-components-links-module-MapLocationsModule-361525360c3f1eafed739e0642b70055"' }>
                                            <li class="link">
                                                <a href="components/MapLocationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapLocationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MapLocationsRoutingModule.html" data-type="entity-link">MapLocationsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PageHeaderModule.html" data-type="entity-link">PageHeaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PageHeaderModule-bc7a90082b18d8bf8a7738368a40ae8a"' : 'data-target="#xs-components-links-module-PageHeaderModule-bc7a90082b18d8bf8a7738368a40ae8a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PageHeaderModule-bc7a90082b18d8bf8a7738368a40ae8a"' :
                                            'id="xs-components-links-module-PageHeaderModule-bc7a90082b18d8bf8a7738368a40ae8a"' }>
                                            <li class="link">
                                                <a href="components/PageHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link">ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProjectsModule-ed634f0b15228da8e961a16d30a13481"' : 'data-target="#xs-components-links-module-ProjectsModule-ed634f0b15228da8e961a16d30a13481"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProjectsModule-ed634f0b15228da8e961a16d30a13481"' :
                                            'id="xs-components-links-module-ProjectsModule-ed634f0b15228da8e961a16d30a13481"' }>
                                            <li class="link">
                                                <a href="components/BlankComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlankComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsRoutingModule.html" data-type="entity-link">ProjectsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/QuickSidebarModule.html" data-type="entity-link">QuickSidebarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-QuickSidebarModule-803ff23771320396f2cf42f7a938a01f"' : 'data-target="#xs-components-links-module-QuickSidebarModule-803ff23771320396f2cf42f7a938a01f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QuickSidebarModule-803ff23771320396f2cf42f7a938a01f"' :
                                            'id="xs-components-links-module-QuickSidebarModule-803ff23771320396f2cf42f7a938a01f"' }>
                                            <li class="link">
                                                <a href="components/QuickSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuickSidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchModule.html" data-type="entity-link">SearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SearchModule-6b49a5a08ae879108272833fb497952a"' : 'data-target="#xs-components-links-module-SearchModule-6b49a5a08ae879108272833fb497952a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchModule-6b49a5a08ae879108272833fb497952a"' :
                                            'id="xs-components-links-module-SearchModule-6b49a5a08ae879108272833fb497952a"' }>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link">SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsModule-8ad5b85e119cd0507ced00f031ff6e22"' : 'data-target="#xs-components-links-module-SettingsModule-8ad5b85e119cd0507ced00f031ff6e22"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsModule-8ad5b85e119cd0507ced00f031ff6e22"' :
                                            'id="xs-components-links-module-SettingsModule-8ad5b85e119cd0507ced00f031ff6e22"' }>
                                            <li class="link">
                                                <a href="components/ConfigurationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfigurationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropdownTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DynamicDropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicDropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DynamicDropdownCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicDropdownCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DynamicDropdownEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicDropdownEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapConfigComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapConfigComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivilegesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivilegesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link">SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedRecordsModule.html" data-type="entity-link">SharedRecordsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedRecordsModule-ba2991de2f8f860ea335169cd7db756a"' : 'data-target="#xs-components-links-module-SharedRecordsModule-ba2991de2f8f860ea335169cd7db756a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedRecordsModule-ba2991de2f8f860ea335169cd7db756a"' :
                                            'id="xs-components-links-module-SharedRecordsModule-ba2991de2f8f860ea335169cd7db756a"' }>
                                            <li class="link">
                                                <a href="components/FullRecordViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FullRecordViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GetRecordsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GetRecordsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MediaWidgetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MediaWidgetsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SharedRecordsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SharedRecordsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharingFormBuilderModule.html" data-type="entity-link">SharingFormBuilderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharingFormBuilderModule-c49c8052f0f5062b7043cb0136512f91"' : 'data-target="#xs-components-links-module-SharingFormBuilderModule-c49c8052f0f5062b7043cb0136512f91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharingFormBuilderModule-c49c8052f0f5062b7043cb0136512f91"' :
                                            'id="xs-components-links-module-SharingFormBuilderModule-c49c8052f0f5062b7043cb0136512f91"' }>
                                            <li class="link">
                                                <a href="components/ElementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ElementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormBuilderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormBuilderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PropertiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PropertiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharingModuleModule.html" data-type="entity-link">SharingModuleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' : 'data-target="#xs-components-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' :
                                            'id="xs-components-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' }>
                                            <li class="link">
                                                <a href="components/DeleteTemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteTemplateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToogleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToogleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' : 'data-target="#xs-directives-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' :
                                        'id="xs-directives-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' }>
                                        <li class="link">
                                            <a href="directives/AppPasswordDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppPasswordDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NoWhitespaceDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoWhitespaceDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NumberDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ScrollToBottomDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScrollToBottomDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SpecialCharacterDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpecialCharacterDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' : 'data-target="#xs-pipes-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' :
                                            'id="xs-pipes-links-module-SharingModuleModule-c22ff7115c5dbe2ef2c61fc31a124942"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/Format.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Format</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/NofdaysPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NofdaysPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/OrderBy.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderBy</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/RemoveSpacePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RemoveSpacePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ShortenPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShortenPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TimeHrsPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeHrsPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TrimmingPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrimmingPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SortingTableModule.html" data-type="entity-link">SortingTableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SortingTableModule-f6036d0196942bbb66cfd49a17962845"' : 'data-target="#xs-components-links-module-SortingTableModule-f6036d0196942bbb66cfd49a17962845"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SortingTableModule-f6036d0196942bbb66cfd49a17962845"' :
                                            'id="xs-components-links-module-SortingTableModule-f6036d0196942bbb66cfd49a17962845"' }>
                                            <li class="link">
                                                <a href="components/SortingTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SortingTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link">TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TasksModule-c2a30cbcae051d651622ae28ee927503"' : 'data-target="#xs-components-links-module-TasksModule-c2a30cbcae051d651622ae28ee927503"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TasksModule-c2a30cbcae051d651622ae28ee927503"' :
                                            'id="xs-components-links-module-TasksModule-c2a30cbcae051d651622ae28ee927503"' }>
                                            <li class="link">
                                                <a href="components/TaskCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TaskListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TasksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkflowhistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowhistoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksRoutingModule.html" data-type="entity-link">TasksRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatesModule.html" data-type="entity-link">TemplatesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TemplatesModule-626bcec011bc47b2fea1b8144351c22a"' : 'data-target="#xs-components-links-module-TemplatesModule-626bcec011bc47b2fea1b8144351c22a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatesModule-626bcec011bc47b2fea1b8144351c22a"' :
                                            'id="xs-components-links-module-TemplatesModule-626bcec011bc47b2fea1b8144351c22a"' }>
                                            <li class="link">
                                                <a href="components/TemplatesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplatesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplatesCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplatesCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplatesDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplatesDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplatesEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplatesEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplatesImportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplatesImportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplatesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplatesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatesRoutingModule.html" data-type="entity-link">TemplatesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-b061cb85bc98ff10e0191eda9996643f"' : 'data-target="#xs-components-links-module-UsersModule-b061cb85bc98ff10e0191eda9996643f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-b061cb85bc98ff10e0191eda9996643f"' :
                                            'id="xs-components-links-module-UsersModule-b061cb85bc98ff10e0191eda9996643f"' }>
                                            <li class="link">
                                                <a href="components/UsersBulkimportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersBulkimportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link">UsersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationViewModule.html" data-type="entity-link">ValidationViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ValidationViewModule-8395293fb761341309850d7c487543a3"' : 'data-target="#xs-components-links-module-ValidationViewModule-8395293fb761341309850d7c487543a3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ValidationViewModule-8395293fb761341309850d7c487543a3"' :
                                            'id="xs-components-links-module-ValidationViewModule-8395293fb761341309850d7c487543a3"' }>
                                            <li class="link">
                                                <a href="components/ValidationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ValidationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ValidationViewModule.html" data-type="entity-link">ValidationViewModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WebUserModule.html" data-type="entity-link">WebUserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WebUserModule-badf5326e0b8ba60d0c1e788c8074ac6"' : 'data-target="#xs-components-links-module-WebUserModule-badf5326e0b8ba60d0c1e788c8074ac6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WebUserModule-badf5326e0b8ba60d0c1e788c8074ac6"' :
                                            'id="xs-components-links-module-WebUserModule-badf5326e0b8ba60d0c1e788c8074ac6"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkAssignmentsModule.html" data-type="entity-link">WorkAssignmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WorkAssignmentsModule-221e59e92b67556241a39b781e1484fe"' : 'data-target="#xs-components-links-module-WorkAssignmentsModule-221e59e92b67556241a39b781e1484fe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkAssignmentsModule-221e59e92b67556241a39b781e1484fe"' :
                                            'id="xs-components-links-module-WorkAssignmentsModule-221e59e92b67556241a39b781e1484fe"' }>
                                            <li class="link">
                                                <a href="components/WorkAssignmentCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkAssignmentCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkAssignmentDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkAssignmentDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkAssignmentEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkAssignmentEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkAssignmentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkAssignmentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkAssignmentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkAssignmentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/workflowCycleModule.html" data-type="entity-link">workflowCycleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-workflowCycleModule-ec688267d5b52ac8c758d47258f9548a"' : 'data-target="#xs-components-links-module-workflowCycleModule-ec688267d5b52ac8c758d47258f9548a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-workflowCycleModule-ec688267d5b52ac8c758d47258f9548a"' :
                                            'id="xs-components-links-module-workflowCycleModule-ec688267d5b52ac8c758d47258f9548a"' }>
                                            <li class="link">
                                                <a href="components/WorkflowCycleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowCycleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowManagementModule.html" data-type="entity-link">WorkflowManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WorkflowManagementModule-1eba9cb23037946f52d1717e2dad08c1"' : 'data-target="#xs-components-links-module-WorkflowManagementModule-1eba9cb23037946f52d1717e2dad08c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowManagementModule-1eba9cb23037946f52d1717e2dad08c1"' :
                                            'id="xs-components-links-module-WorkflowManagementModule-1eba9cb23037946f52d1717e2dad08c1"' }>
                                            <li class="link">
                                                <a href="components/WorkFlowCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkFlowCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkFlowEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkFlowEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkFlowLevelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkFlowLevelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkFlowListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkFlowListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkflowDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkflowManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowManagementRoutingModule.html" data-type="entity-link">WorkflowManagementRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DynamicFormComponent-1.html" data-type="entity-link">DynamicFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormCheckBoxComponent-1.html" data-type="entity-link">FormCheckBoxComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormDropDownComponent-1.html" data-type="entity-link">FormDropDownComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormHeaderComponent-1.html" data-type="entity-link">FormHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormInputComponent-1.html" data-type="entity-link">FormInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormNumberComponent-1.html" data-type="entity-link">FormNumberComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormRadioButtonComponent-1.html" data-type="entity-link">FormRadioButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormRatingComponent-1.html" data-type="entity-link">FormRatingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormsListComponent-1.html" data-type="entity-link">FormsListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormTableComponent-1.html" data-type="entity-link">FormTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormTextAreaComponent-1.html" data-type="entity-link">FormTextAreaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormTimeComponent-1.html" data-type="entity-link">FormTimeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormUserPropertiesComponent-1.html" data-type="entity-link">FormUserPropertiesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormVideoComponent-1.html" data-type="entity-link">FormVideoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchComponent-1.html" data-type="entity-link">SearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ValidationComponent.html" data-type="entity-link">ValidationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ValidationComponent-1.html" data-type="entity-link">ValidationComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/DynamicFieldDirective-1.html" data-type="entity-link">DynamicFieldDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SpecialCharacterDirective-1.html" data-type="entity-link">SpecialCharacterDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/adminConstants.html" data-type="entity-link">adminConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/BulkimportConstants.html" data-type="entity-link">BulkimportConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryConstants.html" data-type="entity-link">CategoryConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/Constants.html" data-type="entity-link">Constants</a>
                            </li>
                            <li class="link">
                                <a href="classes/dashboardConstansts.html" data-type="entity-link">dashboardConstansts</a>
                            </li>
                            <li class="link">
                                <a href="classes/deptConstants.html" data-type="entity-link">deptConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/Devicemanagementconstants.html" data-type="entity-link">Devicemanagementconstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormModuleconstants.html" data-type="entity-link">FormModuleconstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/HeaderInputs.html" data-type="entity-link">HeaderInputs</a>
                            </li>
                            <li class="link">
                                <a href="classes/layoutConstansts.html" data-type="entity-link">layoutConstansts</a>
                            </li>
                            <li class="link">
                                <a href="classes/licensesConstansts.html" data-type="entity-link">licensesConstansts</a>
                            </li>
                            <li class="link">
                                <a href="classes/objcetKeyConstants.html" data-type="entity-link">objcetKeyConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidation.html" data-type="entity-link">PasswordValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectConstants.html" data-type="entity-link">ProjectConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/settingsConstansts.html" data-type="entity-link">settingsConstansts</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharingConstants.html" data-type="entity-link">SharingConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserConstants.html" data-type="entity-link">UserConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/webUserConstants.html" data-type="entity-link">webUserConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/widgetKeys.html" data-type="entity-link">widgetKeys</a>
                            </li>
                            <li class="link">
                                <a href="classes/widgetKeys-1.html" data-type="entity-link">widgetKeys</a>
                            </li>
                            <li class="link">
                                <a href="classes/widgetProperties.html" data-type="entity-link">widgetProperties</a>
                            </li>
                            <li class="link">
                                <a href="classes/widgetTypes.html" data-type="entity-link">widgetTypes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Workflow.html" data-type="entity-link">Workflow</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowConstants.html" data-type="entity-link">WorkflowConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowForm.html" data-type="entity-link">WorkflowForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowLevel.html" data-type="entity-link">WorkflowLevel</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkflowLevelForm.html" data-type="entity-link">WorkflowLevelForm</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdministratorServiceService.html" data-type="entity-link">AdministratorServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApprovalsService.html" data-type="entity-link">ApprovalsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AsyncDownloadService.html" data-type="entity-link">AsyncDownloadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalculationService.html" data-type="entity-link">CalculationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link">CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChangepasswordServiceService.html" data-type="entity-link">ChangepasswordServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link">CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardsService.html" data-type="entity-link">DashboardsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepartmentsService.html" data-type="entity-link">DepartmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceManagementServiceService.html" data-type="entity-link">DeviceManagementServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormDataDistributionService.html" data-type="entity-link">FormDataDistributionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormDataDistributionService-1.html" data-type="entity-link">FormDataDistributionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormsServicesService.html" data-type="entity-link">FormsServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/headerServices.html" data-type="entity-link">headerServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LicenseManagementService.html" data-type="entity-link">LicenseManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/loginServices.html" data-type="entity-link">loginServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MapLocationsService.html" data-type="entity-link">MapLocationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageHeaderService.html" data-type="entity-link">PageHeaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectServiceService.html" data-type="entity-link">ProjectServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuickSidebarService.html" data-type="entity-link">QuickSidebarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecordsService.html" data-type="entity-link">RecordsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RenderEventsService.html" data-type="entity-link">RenderEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestAPICallsService.html" data-type="entity-link">RestAPICallsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link">SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServerService.html" data-type="entity-link">ServerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionPrefsService.html" data-type="entity-link">SessionPrefsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsService.html" data-type="entity-link">SettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedRecordsService.html" data-type="entity-link">SharedRecordsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SideBarService.html" data-type="entity-link">SideBarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksService.html" data-type="entity-link">TasksService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplatesService.html" data-type="entity-link">TemplatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WindowRef.html" data-type="entity-link">WindowRef</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkAssignmentsService.html" data-type="entity-link">WorkAssignmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkflowCycleService.html" data-type="entity-link">WorkflowCycleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkflowHistoryService.html" data-type="entity-link">WorkflowHistoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkflowManagementService.html" data-type="entity-link">WorkflowManagementService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/NoCacheHeadersInterceptor.html" data-type="entity-link">NoCacheHeadersInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/DeactivateGuardService.html" data-type="entity-link">DeactivateGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginAuthService.html" data-type="entity-link">LoginAuthService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Administrators.html" data-type="entity-link">Administrators</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CanComponentDeactivate.html" data-type="entity-link">CanComponentDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Departments.html" data-type="entity-link">Departments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Field.html" data-type="entity-link">Field</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Field-1.html" data-type="entity-link">Field</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldConfig.html" data-type="entity-link">FieldConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FieldConfig-1.html" data-type="entity-link">FieldConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageHeader.html" data-type="entity-link">PageHeader</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Window.html" data-type="entity-link">Window</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});