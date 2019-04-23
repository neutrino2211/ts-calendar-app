import { StatefulWidget } from "../component-library/StatefulWidget";
import { Header } from "./Header";

export class Body extends StatefulWidget {
    private header: Header
    constructor(){
        super({});
        this.header = <Header>this.$ref('calendar-header');
        this.peerComponent(this.header);
    }

    render(state){
        return `
        <ul class="days">
            <calendar-month month=${this.header.state.month}>
            </calendar-month>
        </ul>
        `;
    }
}