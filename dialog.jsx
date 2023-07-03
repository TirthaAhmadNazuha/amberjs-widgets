import { StateComponent, fullyPrepared } from 'amber';

const Dialog = class extends StateComponent {
  modal() {
    return (
      <div
        className="fixed top-0 bottom-0 left-0 transition-opacity duration-[400ms] opacity-0 right-0 bg-opacity-50 bg-black z-50"
        then={(elem) => elem.classList.remove('opacity-0')}
        data-toggle={this.props.name}
      >
        <div
          className="bottom-0 transition-all duration-[400ms] left-0 absolute bg-white text-slate-950 w-full p-4 pb-6 rounded-t-3xl rounded-tr-3xl"
        >
          <h3 className="font-semibold text-xl">{this.props?.title}</h3>
          <p>{this.props?.text}</p>
          <div
            className="grid grid-cols-2 gap-3 my-5 [&>*]:p-2 [&>*]:h-9 [&>*]:rounded-xl [&>*]:font-medium [&>*]:flex [&>*]:items-center [&>*]:justify-center"
          >
            {...(this.props?.buttons || [])}
          </div>
        </div>
      </div>
    );
  }

  render() {
    this.modal = this.modal.bind(this);
    this.makeEventBtns = this.makeEventBtns.bind(this);
    this.state = {
      show: this.props?.show ? this.modal() : ''
    };

    this.btnToggleClick = this.btnToggleClick.bind(this);
    this.state.show.onChange = this.makeEventBtns;

    return <>{this.state.show}</>;
  }

  btnToggleClick(event) {
    event.stopPropagation();
    const { show } = this.state;
    this.setState({ show: show.valueOf() === '' ? this.modal() : '' });
  }

  makeEventBtns() {
    const btns = document.querySelectorAll(`*[data-toggle="${this.props.name}"]`);
    btns.forEach((btn) => {
      btn.removeEventListener('click', this.btnToggleClick);
      btn.addEventListener('click', this.btnToggleClick);
    });
  }

  async onConnected() {
    this.state.show.preChange = (previousValue) => {
      if (typeof previousValue === 'string') return;
      return new Promise((resolve) => {
        previousValue.classList.toggle('opacity-0');
        previousValue.firstChild.classList.replace('bottom-0', 'bottom-[-25%]');
        previousValue.ontransitionend = () => resolve(true);
      });
    };
    await fullyPrepared();
    this.makeEventBtns();
  }
};

export default Dialog;