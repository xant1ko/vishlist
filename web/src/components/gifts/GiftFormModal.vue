<template>
  <v-dialog
    v-model="isOpen"
    max-width="640"
  >
    <v-card rounded="lg">
      <v-card-title class="pa-6 pb-2">
        {{ props.gift ? 'Редактировать желание' : 'Добавить желание' }}
      </v-card-title>

      <v-form @submit.prevent="submit">
        <v-card-text class="pa-6 d-flex flex-column ga-4">
          <v-alert
            v-if="props.errorMessage"
            type="error"
          >
            {{ props.errorMessage }}
          </v-alert>
          <v-text-field
            v-model.trim="form.name"
            label="Название"
            maxlength="200"
            :rules="[requiredRule]"
            :disabled="props.isSaving"
          />

          <v-textarea
            v-model.trim="form.description"
            label="Описание"
            maxlength="2000"
            rows="3"
            :disabled="props.isSaving"
          />

          <div class="text-subtitle-2 mb-2">Ссылки</div>
          <div
            v-for="(_, index) in form.links"
            :key="index"
            class="d-flex align-start ga-2"
          >
            <v-text-field
              v-model.trim="form.links[index]"
              label="Ссылка на подарок"
              type="url"
              placeholder="https://example.com"
              :disabled="props.isSaving"
            />
            <v-btn
              aria-label="Удалить ссылку"
              icon="mdi-close"
              size="small"
              variant="text"
              :disabled="props.isSaving"
              @click="removeLink(index)"
            />
          </div>
          <v-btn
            prepend-icon="mdi-plus"
            size="small"
            variant="text"
            :disabled="props.isSaving"
            @click="addLink"
          >
            Добавить ссылку
          </v-btn>
        </v-card-text>

        <v-card-actions class="px-6 pb-6">
          <v-btn
            v-if="props.gift"
            color="error"
            :disabled="props.isSaving"
            @click="emit('remove')"
          >
            Удалить
          </v-btn>
          <v-spacer />
          <v-btn :disabled="props.isSaving" @click="isOpen = false">Отмена</v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="props.isSaving"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { Gift, GiftFormData } from '../../api/gifts'

const props = defineProps<{
  modelValue: boolean
  gift: Gift | null
  errorMessage: string | null
  isSaving: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  remove: []
  save: [data: GiftFormData]
}>()

const form = reactive<GiftFormData>({
  name: '',
  description: '',
  links: [],
})

const isOpen = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

function requiredRule (value: string): boolean | string {
  return Boolean(value.trim()) || 'Укажите название желания.'
}

function resetForm (): void {
  form.name = props.gift?.name ?? ''
  form.description = props.gift?.description ?? ''
  form.links = props.gift?.links.slice() ?? []
}

function addLink (): void {
  if (form.links.length < 20) form.links.push('')
}

function removeLink (index: number): void {
  form.links.splice(index, 1)
}

function submit (): void {
  if (!form.name.trim()) return

  emit('save', {
    name: form.name.trim(),
    description: form.description.trim(),
    links: form.links.map(link => link.trim()).filter(Boolean),
  })
}

watch(isOpen, isDialogOpen => {
  if (isDialogOpen) resetForm()
})
</script>
