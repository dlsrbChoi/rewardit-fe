<template>
  <div>
    <div class="reawrd-modal">
      <div class="modalHead">
        <p class="title"><slot name="info"></slot></p>
        <p class="point"><slot name="point"></slot></p>
      </div>
      <div class="modalCont">
        <div class="modal-inner">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="modalBottom">
        <slot name="bottom"></slot>
      </div>
      <div>
        <slot name="button"></slot>
      </div>
    </div>
    <div class="dim">
      <slot name="dimarea"></slot>
    </div>
  </div>
</template>
