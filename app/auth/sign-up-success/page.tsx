import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Kayıt olduğunuz için teşekkürler!
              </CardTitle>
              <CardDescription>
                Hesabınızı onaylamak için e-postanızı kontrol edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Başarıyla kaydoldunuz. Giriş yapmadan önce hesabınızı onaylamak
                için lütfen e-postanızı kontrol edin.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
