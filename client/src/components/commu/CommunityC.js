"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const listAll_1 = __importDefault(require("../../axios/post/listAll"));
const SearchList_1 = __importDefault(require("./SearchList"));
const date_fns_1 = require("date-fns");
const Community = () => {
    const [postList, setPostList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchPostList = () => __awaiter(void 0, void 0, void 0, function* () {
            const newPostList = yield (0, listAll_1.default)();
            if (newPostList) {
                const formattedPostList = newPostList.map((post) => (Object.assign(Object.assign({}, post), { regTime: (0, date_fns_1.format)(new Date(post.regTime), "MM.dd") })));
                if (JSON.stringify(postList) !==
                    JSON.stringify(formattedPostList)) {
                    setPostList(formattedPostList);
                }
            }
        });
        console.log(postList);
        fetchPostList();
    }, [postList]);
    return (<>
            <div className="best_list boxStyle roundCorner shaDow">
                <h4>자유 게시판</h4>

                <ul className="board_w100">
                    {postList &&
            postList.map((post, key) => (<li key={key}>
                                <react_router_dom_1.Link to={`/view/${post.boardId}`}>
                                    <div className="board_info">
                                        <div className="board_title textCut">
                                            {post.boardTitle}
                                        </div>
                                        <div className="board_author textCut">
                                            {post.boardAuthor}
                                        </div>
                                        <div className="board_date">
                                            {post.regTime}
                                        </div>
                                        <div className="board_view">
                                            <span>{post.boardView}</span>
                                        </div>
                                    </div>
                                </react_router_dom_1.Link>
                            </li>))}
                </ul>

                <div className="board_page_option">
                    <div className="board_pages">
                        <ul className="pages_list">
                            <li className="prev">
                                <react_router_dom_1.Link to="board.php?page={$prevPage}">
                                    &lt;
                                </react_router_dom_1.Link>
                            </li>
                            <li className="$active">
                                <react_router_dom_1.Link to="board.php?page={$i}">$i</react_router_dom_1.Link>
                            </li>
                            <li className="next">
                                <react_router_dom_1.Link to="board.php?page={$nextPage}">
                                    &gt;
                                </react_router_dom_1.Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <SearchList_1.default />
            </div>
        </>);
};
exports.default = Community;
