import z from "zod"

const ipSchema = z.object({
    ip: z.string().ip()
})

export function validateSchema(object) {
    return ipSchema.safeParse(object)
}