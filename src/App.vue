<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { onMounted, ref } from 'vue'
import { right } from '@popperjs/core'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { ButtonInstance } from './components/Button/types'
import Collapse from './components/Collapse/Collapse.vue'
import Icon from './components/Icon/Icon.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Alert from './components/Alert/Alert.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import { createMessage } from './components/Message/method'
const triggerNode = ref<HTMLElement>()
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const size = ref<'3x' | '2xl'>('3x')
const openedValue = ref(['a'])
const trigger = ref<any>('click')
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
onMounted(() => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
  createMessage({ message: ' hello world', duration: 0, type: 'warning' })
  createMessage({ message: 'hello again', duration: 0, type: 'success' })
  createMessage({ message: 'hello again again', duration: 0 })
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
    // instance.destroy()
  }, 2000)
})
</script>

<template>
  <header>
    <Tooltip
      :placement="right"
      :trigger="trigger"
      ref="tooltipRef"
      :open-delay="1000"
      :close-delay="1000"
    >
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
        ref="triggerNode"
      />
      <template #content>
        <h1>hello tooltip</h1>
      </template>
    </Tooltip>
  </header>
  <Icon icon="arrow-up" :size="size" type="danger" color="orange" />
  <main>
    <Button ref="buttonRef" @click="open">Test Button</Button>
    <Button plain @click="close">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>TW</Button>
    <Button disabled>Disabled Button</Button>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />
    <Button size="large" loading> loading </Button>
    <Button size="large" icon="arrow-up"> Icon </Button>

    <Collapse v-model="openedValue" accordin>
      <Item name="a">
        <!-- #title 相当于 v-slot: title -->
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>headline title</h1>
        <div>this is a content</div>
      </Item>
      <Item name="b" title="Title B">
        <div>this is bbbbb test</div>
      </Item>
      <Item name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </Item>
      {{ openedValue }}
    </Collapse>
    <Alert type="primary" closed>
      <p>this is a block</p>
    </Alert>
    <Alert type="warning" effect="dark">
      <p>this is a block</p>
    </Alert>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
