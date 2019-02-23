import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

class WikiDiff extends Component {
    render() {
        const rawDiffHTML = this.props.diffObj.diffHTML
        const topRows = MakeTitleRow(this.props.diffObj)
        const diffHTML = topRows + rawDiffHTML
        const innerHTMLObj = {__html: diffHTML};

        return <div className="cs-wiki-diffmediawiki ltr sitedir-ltr mw-hide-empty-elt ns-0 ns-subject mw-editable skin-vector action-view">

            <table className="mw-body-content diff diff-contentalign-left">
                <colgroup>
                    <col className="diff-marker"></col>
                        <col className="diff-content"></col>
                            <col className="diff-marker"></col>
                                <col className="diff-content"></col>
                </colgroup>
                <tbody
                    data-mw="interface"
                    dangerouslySetInnerHTML={innerHTMLObj} />

            </table>
        </div>
    }
}

class DiffTitle extends Component {

    render(){
        const oOrn = this.props.newold === 'new' ? "n" : "o"
        const revIdKey = this.props.newold + "RevId"
        const revDateKey = this.props.newold + "RevDate"
        const revUserKey = this.props.newold + "RevUser"
        const revCommentKey = this.props.newold + "RevComment"
        const revId = this.props.diffObj[revIdKey]
        const revDate = this.props.diffObj[revDateKey]
        const revUser = this.props.diffObj[revUserKey]
        const revComment = this.props.diffObj[revCommentKey]
        const revLink = "https://"+this.props.diffObj['lang']+".wikipedia.org/wiki/?oldid="+revId
        return(
            <td className={"diff-"+oOrn+"title"} colSpan={2}>
            <div id={"mw-diff-"+oOrn+"title1"}>
                <strong>{revDate} <a href={revLink}>{revId}</a></strong>
            </div>
            <div id={"mw-diff-"+oOrn+"title2"}>
                {revUser}
            </div>
            <div id={"mw-diff-"+oOrn+"title3"}>
                {revComment}
            </div>
            </td>)
    }
}


function MakeTitleRow(diffObj){
    const titleRow = <tr className="diff-title">
                    <DiffTitle newold="new" diffObj={diffObj}>
                    </DiffTitle>
                    <DiffTitle newold="old" diffObj={diffObj}>
                    </DiffTitle>
                    </tr>
     const htmlString = ReactDOMServer.renderToStaticMarkup(titleRow)
    return htmlString
}
export default WikiDiff
